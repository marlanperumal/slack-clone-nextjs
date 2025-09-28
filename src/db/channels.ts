"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { channels } from "@/db/schema";

export async function getChannels() {
  const data = await db.select().from(channels);
  return data;
}

export async function createChannel(name: string) {
  const data = await db.insert(channels).values({ name });
  return data;
}

export async function deleteChannel(id: number) {
  const data = await db.delete(channels).where(eq(channels.id, id));
  return data;
}