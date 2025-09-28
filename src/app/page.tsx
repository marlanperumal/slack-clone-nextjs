import { getChannels } from "@/db/channels";

import Channels from "./channels";
import Chat from "./chat";
import Thread from "./thread";

export default async function Home() {
  const channels = await getChannels();

  return (
    <div className="flex flex-row h-screen">
      <Channels channels={channels} />
      <Chat />
      <Thread />
    </div>
  );
}
