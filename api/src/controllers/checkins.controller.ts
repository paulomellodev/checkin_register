import { ZodError } from "zod";
import { userCreateSchema } from "../dto/user.dto";
import AppErrors from "../errors/app.error";
import { NextFunction, Request, Response } from "express";
import checkinService from "../services/checkin.service";
import {
  checkinDateCreateSchema,
  checkinDateReturnManySchema,
} from "../dto/checkinDate.dto";

class CheckinController {
  private checkinService: typeof checkinService;

  constructor(service: typeof checkinService) {
    this.checkinService = service;
  }

  async register(req: Request, res: Response) {
    try {
      const validated = checkinDateCreateSchema.parse({
        ...req.body,
        userId: req.user.id,
      });

      const registeredCheckin = await this.checkinService.insert(validated);

      return res.status(201).json(registeredCheckin);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppErrors(error.flatten().fieldErrors);
      }
    }
  }

  async retrieveCheckin(req: Request, res: Response) {
    const checkins = checkinDateReturnManySchema.parse(
      await this.checkinService.findCheckinsByUserId(req.params.id)
    );

    return res.status(201).json(checkins);
  }
}

export default new CheckinController(checkinService);
