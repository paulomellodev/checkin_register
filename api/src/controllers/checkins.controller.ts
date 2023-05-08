import { ZodError } from "zod";
import AppErrors from "../errors/app.error";
import { Request, Response } from "express";
import { findCheckinsByUserId, insert } from "../services/checkin.service";
import {
  checkinDateCreateSchema,
  checkinDateReturnManySchema,
} from "../dto/checkinDate.dto";

export const register = async (req: Request, res: Response) => {
  try {
    console.log("aqui");
    const validated = checkinDateCreateSchema.parse({
      ...req.body,
      date: new Date(req.body.date),
    });

    const registeredCheckin = await insert(validated);

    return res.status(201).json(registeredCheckin);
  } catch (error) {
    console.log(error);
    console.log(error instanceof ZodError);
    if (error instanceof ZodError) {
      console.log(error instanceof ZodError, "aqui");
      throw new AppErrors(error.flatten().fieldErrors);
    }
  }
};

export const retrieveCheckin = async (req: Request, res: Response) => {
  const checkins = checkinDateReturnManySchema.parse(
    await findCheckinsByUserId(req.params.id)
  );

  return res.status(201).json(checkins);
};
