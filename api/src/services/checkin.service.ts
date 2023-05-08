import { prismaClient } from "../database/prismaClient";
import { checkinDateReturnManySchema } from "../dto/checkinDate.dto";
import {
  checkinDateCreateType,
  checkinDateSchema,
  checkinDateType,
} from "../dto/checkinDate.dto";
import AppErrors from "../errors/app.error";
import { calculateWorkingHours } from "../utils/calculateHours";

export const insert = async (data: checkinDateCreateType) => {
  const formattedData = {
    ...data,
    date: new Date(data.date),
  };

  const foundCheckinToday = await prismaClient.checkinDate.findMany({
    where: {
      AND: [
        {
          date: new Date(formattedData.date),
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
    const totalHours = calculateWorkingHours(parsedFoundcheckin, data.date)
      .toLocaleString("pt-BR")
      .substring(12);

    const updatedCheckin = await prismaClient.checkinDate.update({
      where: {
        id: foundCheckinToday[0].id,
      },
      data: {
        total_hours: totalHours,
        ...formattedData,
      },
      include: { checkin_time: true },
    });
    return checkinDateSchema.parse(updatedCheckin);
  }

  const registeredCheckin = await prismaClient.checkinDate.create({
    data: {
      ...formattedData,
    },
  });

  return checkinDateSchema.parse(registeredCheckin);
};

export const findCheckinsByUserId = async (userId: string) => {
  try {
    const foundAllCheckins = await prismaClient.checkinDate.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return checkinDateReturnManySchema.parse(foundAllCheckins);
  } catch (error) {
    throw new AppErrors(`User with this ID ${userId} not found`, 404);
  }
};
