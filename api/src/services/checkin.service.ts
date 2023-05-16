import { PrismaClient } from "@prisma/client";
import { checkinDateReturnManySchema } from "../dto/checkinDate.dto";
import {
  checkinDateCreateType,
  checkinDateSchema,
} from "../dto/checkinDate.dto";
import AppErrors from "../errors/app.error";
import { calculateWorkingHours } from "../utils/calculateHours";
import { prisma } from "../database/prismaClient";

class CheckinService {
  private prismaCheckin: PrismaClient["checkinDate"];

  constructor(prismaClient: PrismaClient) {
    this.prismaCheckin = prismaClient.checkinDate;
  }

  async register({ userId }: checkinDateCreateType) {
    const currentDateTime = new Date();

    const foundCheckinToday = await this.prismaCheckin.findFirst({
      where: {
        AND: [
          {
            date: {
              equals: currentDateTime,
            },
          },
          {
            userId: userId,
          },
        ],
      },
      include: {
        checkinHour: true,
      },
    });

    if (!!foundCheckinToday) {
      let updatedCheckin = await this.prismaCheckin.update({
        where: {
          id: foundCheckinToday.id,
        },
        data: {
          checkinHour: { create: { time: currentDateTime } },
        },
        include: { checkinHour: true },
      });

      if (updatedCheckin.checkinHour.length % 2 === 0) {
        let totalHours = calculateWorkingHours(updatedCheckin.checkinHour);

        updatedCheckin = await this.prismaCheckin.update({
          where: {
            id: foundCheckinToday.id,
          },
          data: {
            total_hours: totalHours,
          },
          include: { checkinHour: true },
        });
      }
      return checkinDateSchema.parse(updatedCheckin);
    }

    const registeredCheckin = await this.prismaCheckin.create({
      data: {
        userId,
        date: currentDateTime,
        checkinHour: {
          create: {
            time: currentDateTime,
          },
        },
      },
      include: { checkinHour: true },
    });

    return checkinDateSchema.parse(registeredCheckin);
  }

  findCheckinsByUserId = async (userId: string) => {
    try {
      const foundAllCheckins = await this.prismaCheckin.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        include: { checkinHour: true },
      });
      return foundAllCheckins;
    } catch (error) {
      throw new AppErrors(`User with this ID ${userId} not found`, 404);
    }
  };
}

const checkinsServices = new CheckinService(prisma);

export { checkinsServices };
