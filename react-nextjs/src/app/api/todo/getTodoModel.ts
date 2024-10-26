import { PrismaClient } from '@prisma/client'

export default async function getTodoModel() {
  const prismaClient = new PrismaClient()
  return prismaClient.todo
}