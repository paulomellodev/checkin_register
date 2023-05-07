import { prismaClient } from "../database/prismaClient";
import { checkinDateReturnManySchema } from "../dto/checkinDate.dto";
import {
  checkinDateCreateType,
  checkinDateSchema,
  checkinDateType,
} from "../dto/checkinDate.dto";
import AppErrors from "../errors/app.error";
import { calculateWorkingHours } from "../utils/calculateHours";

class CheckinService {
  private prisma: typeof prismaClient.checkinDate;
  constructor(prisma: typeof prismaClient.checkinDate) {
    this.prisma = prisma;
  }
  async insert(data: checkinDateCreateType) {
    const formattedData = {
      ...data,
      date: data.date.toLocaleDateString("pt-BR"),
    };

    const foundCheckinToday = await this.prisma.findFirst({
      where: {
        AND: [
          {
            date: formattedData.date,
          },
          {
            userId: formattedData.userId,
          },
        ],
      },
      include: {
        checkin_time: true,
      },
    });

    if (!!foundCheckinToday) {
      const parsedFoundcheckin = checkinDateSchema.parse(foundCheckinToday);
      const totalHours = calculateWorkingHours(
        parsedFoundcheckin.checkin_time,
        data.date
      )
        .toLocaleString("pt-BR")
        .substring(12);

      const updatedCheckin = await this.prisma.update({
        where: {
          id: foundCheckinToday.id,
        },
        data: {
          total_hours: totalHours,
          checkin_time: {
            create: {
              time: data.date.toLocaleTimeString("pt-BR"),
            },
          },
        },
        include: { checkin_time: true },
      });
      return checkinDateSchema.parse(updatedCheckin);
    }
    const registeredCheckin = await this.prisma.create({
      data: {
        ...formattedData,
        checkin_time: {
          create: [{ time: data.date.toLocaleTimeString("pt-BR") }],
        },
      },
      include: { checkin_time: true },
    });

    return checkinDateSchema.parse(registeredCheckin);
  }

  async findCheckinsByUserId(userId: string) {
    try {
      const foundAllCheckins = await this.prisma.findMany({
        where: { userId },
        include: { checkin_time: true },
        orderBy: { date: "desc" },
      });
      return checkinDateReturnManySchema.parse(foundAllCheckins);
    } catch (error) {
      throw new AppErrors(`User with this ID ${userId} not found`, 404);
    }
  }
}

export default new CheckinService(prismaClient.checkinDate);
