import { ZodError } from "zod";
import AppErrors from "../errors/app.error";
import { Request, Response } from "express";
import {
  checkinDateCreateSchema,
  checkinDateReturnManySchema,
} from "../dto/checkinDate.dto";
import { checkinsServices } from "../services/checkin.service";

class CheckinController {
  async register(req: Request, res: Response) {
    try {
      const registeredCheckin = await checkinsServices.register({
        userId: req.params.userId,
      });

      return res.status(201).json(registeredCheckin);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppErrors(error.flatten().fieldErrors);
      }
    }
  }

  async retrieveCheckin(req: Request, res: Response) {
    const checkins = checkinDateReturnManySchema.parse(
      await checkinsServices.findCheckinsByUserId(req.params.userId)
    );

    return res.status(201).json(checkins);
  }
}

const checkinsControllers = new CheckinController();

export { checkinsControllers };
