import { PrismaClient } from "@prisma/client";

let client = new PrismaClient();

export function getPrismaClient() {
  return client;
}
