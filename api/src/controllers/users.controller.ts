import { ZodError } from "zod";
import { userCreateSchema } from "../dto/user.dto";
import AppErrors from "../errors/app.error";
import { Request, Response } from "express";
import { usersServices } from "../services/users.service";
import { randomCode } from "../utils/randomCode";

class UsersController {
  async create(req: Request, res: Response) {
    try {
      const data = { ...req.body, code: randomCode() };
      const validated = userCreateSchema.parse(data);
      const createdUser = await usersServices.insert(validated);
      return res.status(201).json({ ...createdUser });
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        throw new AppErrors(error.flatten().fieldErrors);
      }
    }
  }

  async findAll(_: Request, res: Response) {
    const users = await usersServices.getUsers();
    return res.send({ users });
  }

  async findOneUser(req: Request, res: Response) {
    const user = await usersServices.findByCode({ code: req.params.code });
    return res.send(user);
  }
}

const usersControllers = new UsersController();

export { usersControllers };
