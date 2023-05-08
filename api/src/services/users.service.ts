import {
  userCreateType,
  userReturnManySchema,
  userReturnManyType,
  userSchema,
  userType,
} from "../dto/user.dto";
import { prismaClient } from "../database/prismaClient";
import AppErrors from "../errors/app.error";

export const insert = async (data: userCreateType): Promise<userType> => {
  const createdUser = await prismaClient.user.create({
    data,
  });

  return userSchema.parse(createdUser);
};

export const getUsers = async (): Promise<userReturnManyType> => {
  const users = await prismaClient.user.findMany();

  return userReturnManySchema.parse(users);
};
export const findByCode = async (
  code: string
): Promise<userType | undefined> => {
  try {
    const foundUser = prismaClient.user.findUnique({
      where: { code },
      include: { checkin: true },
    });
    return userSchema.parse(foundUser);
  } catch (error) {
    throw new AppErrors(`User with code ${code} not found`, 404);
  }
};
