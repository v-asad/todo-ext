import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

class UsersService {
  static async create(data: Prisma.UserCreateInput) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return prisma.user.create({ data });
  }

  static async getAll() {
    return prisma.user.findMany();
  }

  static async getOne(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async getByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async update(id: number, data: Prisma.UserUpdateInput) {
    if (data.password && typeof data.password === "string") {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return prisma.user.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.user.delete({ where: { id } });
  }

  static async authenticate(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }
}

export default UsersService;
