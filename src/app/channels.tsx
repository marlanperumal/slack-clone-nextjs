"use client";

import { MessageSquareIcon, PlusIcon, TrashIcon } from "lucide-react";
import { startTransition, useState } from "react";
import {
  createChannelAction,
  deleteChannelAction,
} from "@/actions/channel-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Channel } from "@/db/types";
import { cn } from "@/lib/utils";

interface props {
  channels: Channel[];
}

export default function Channels({ channels }: props) {
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);

  const handleDeleteChannel = (id: number) => {
    const formData = new FormData();
    formData.append("id", id.toString());
    deleteChannelAction(formData);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    startTransition(() => {
      createChannelAction(formData);
    });
  };

  return (
    <div className="flex flex-col w-1/4 bg-violet-800 relative h-screen">
      <div className="flex flex-row justify-between items-center p-4">
        <h1 className="text-white text-lg font-bold">Channels</h1>
      </div>
      <div className="flex flex-col p-4 gap-2 flex-1">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="flex flex-row justify-between items-center"
          >
            <Button
              key={channel.id}
              variant="ghost"
              className={cn(
                "flex-1 justify-start text-white",
                selectedChannel === channel.id && "bg-violet-500 text-white",
              )}
              onClick={() => setSelectedChannel(channel.id)}
            >
              <MessageSquareIcon className="w-4 h-4" />
              {channel.name}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="justify-start text-white bg-violet-500"
              onClick={() => handleDeleteChannel(channel.id)}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 bg-violet-800">
        <form onSubmit={onSubmit} className="flex flex-row p-4 gap-2">
          <Input
            type="text"
            placeholder="Create a new channel"
            className="bg-white"
            name="name"
          />
          <Button type="submit" className="bg-violet-500 text-white">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
