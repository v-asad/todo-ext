import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class UsersService {
  async create(data: Prisma.UserCreateInput) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return prisma.user.create({ data });
  }

  async getAll() {
    return prisma.user.findMany();
  }

  async getOne(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    if (data.password && typeof data.password === "string") {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return prisma.user.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.user.delete({ where: { id } });
  }

  async authenticate(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { email }
    });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }
}

export default UsersService;
