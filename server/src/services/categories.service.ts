import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoriesService {
  async create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data });
  }

  async getAll() {
    return prisma.category.findMany();
  }

  async getOne(id: number) {
    return prisma.category.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.category.delete({ where: { id } });
  }
}

export default CategoriesService;
