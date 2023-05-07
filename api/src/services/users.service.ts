import {
  userCreateType,
  userReturnManySchema,
  userReturnManyType,
  userSchema,
  userType,
} from "../dto/user.dto";
import { prismaClient } from "../database/prismaClient";
import AppErrors from "../errors/app.error";

class UserService {
  private prisma: typeof prismaClient.user;
  constructor(prisma: typeof prismaClient.user) {
    this.prisma = prisma;
  }
  async insert(data: userCreateType): Promise<userType> {
    const createdUser = await this.prisma.create({
      data,
      include: { checkin: true },
    });

    return userSchema.parse(createdUser);
  }
  async getUsers(): Promise<userReturnManyType> {
    const users = await this.prisma.findMany();

    return userReturnManySchema.parse(users);
  }
  findByCode(code: string): Promise<userType | undefined> | userType {
    try {
      const foundUser = this.prisma.findUnique({
        where: { code },
        include: { checkin: true },
      });
      return userSchema.parse(foundUser);
    } catch (error) {
      throw new AppErrors(`User with code ${code} not found`, 404);
    }
  }
}

export default new UserService(prismaClient.user);
