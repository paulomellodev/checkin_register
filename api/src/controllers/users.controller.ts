import { ZodError } from "zod";
import { userCreateSchema } from "../dto/user.dto";
import { findByCode, getUsers, insert } from "../services/users.service";
import AppErrors from "../errors/app.error";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const validated = userCreateSchema.parse(req.body);
    const createdUser = await insert(validated);
    return res.status(201).json({ ...createdUser });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppErrors(error.flatten().fieldErrors);
    }
  }
};

export const findAll = async (_: Request, res: Response) => {
  const users = await getUsers();
  return res.send({ users });
};

export const findByUser = async (req: Request, res: Response) => {
  const user = await findByCode(req.params.code);
  return res.send(user);
};
