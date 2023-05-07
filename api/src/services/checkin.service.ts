import { prismaClient } from "../database/prismaClient";
import {
  checkinDateCreateType,
  checkinDateSchema,
  checkinDateType,
} from "../dto/checkinDate.dto";
import AppErrors from "../errors/app.error";

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
            date: {
              equals: formattedData.date,
            },
          },
          {
            userId: formattedData.userId,
          },
        ],
      },
    });

    if (foundCheckinToday) {
      const totalHours = foundCheckinToday;
      const registeredCheckin = await this.prisma.update({
        where: {
          id: foundCheckinToday.id,
        },
        data: {
          checkin_time: {
            create: {
              time: data.date.toLocaleTimeString("pt-BR"),
            },
          },
        },
        include: { checkin_time: true },
      });
    }

    registeredCheckin.checkin_time.push();

    const parsedRegistered = checkinDateSchema.parse(registeredCheckin);

    return checkinDateSchema.parse(registeredCheckin);
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

export default new CheckinService(prismaClient.checkinDate);
