import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TodoItemsService {
  async create(data: Prisma.TodoItemCreateInput) {
    return prisma.todoItem.create({ data });
  }

  async getAll() {
    return prisma.todoItem.findMany();
  }

  async getOne(id: number) {
    return prisma.todoItem.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.TodoItemUpdateInput) {
    return prisma.todoItem.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.todoItem.delete({ where: { id } });
  }
}

export default TodoItemsService;
