import { PrismaClient } from "@prisma/client";
import { prisma } from "../database/prismaClient";
import {
  userCreateType,
  userReturnManySchema,
  userReturnManyType,
  userSchema,
  userType,
} from "../dto/user.dto";
import AppErrors from "../errors/app.error";

class UsersServices {
  private prismaUser: PrismaClient["user"];

  constructor(prismaClient: PrismaClient) {
    this.prismaUser = prismaClient.user;
  }
  async insert(data: userCreateType): Promise<userType> {
    const createdUser = await this.prismaUser.create({
      data,
      include: { checkin: true },
    });

    return userSchema.parse(createdUser);
  }

  async getUsers(): Promise<userReturnManyType> {
    const users = await this.prismaUser.findMany();

    return userReturnManySchema.parse(users);
  }

  async findByCode({ code }: { code: string }): Promise<userType | undefined> {
    try {
      const foundUser = await this.prismaUser.findUnique({
        where: { code },
        include: { checkin: { include: { checkinHour: true } } },
      });
      return userSchema.parse(foundUser);
    } catch (error) {
      throw new AppErrors(`User with code ${code} not found`, 404);
    }
  }
}

const usersServices = new UsersServices(prisma);

export { usersServices };
