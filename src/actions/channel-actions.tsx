"use server";

import { revalidatePath } from "next/cache";
import { createChannel, deleteChannel } from "@/db/channels";

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function createChannelAction(formData: FormData) {
  const name = formData.get("name") as string;
  const channel = await createChannel(name);
  console.log(channel);
  await delay(2000);
  revalidatePath("/");
}

export async function deleteChannelAction(formData: FormData) {
  const id = formData.get("id") as unknown as number;
  const channel = await deleteChannel(id);
  console.log(channel);
  revalidatePath("/");
}
