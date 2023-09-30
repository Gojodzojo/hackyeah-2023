import { PrismaClient } from "@prisma/client";

export const database = new PrismaClient();

export default database;

