import { ZodError } from "zod";
import { userCreateSchema } from "../dto/user.dto";
import usersService from "../services/users.service";
import AppErrors from "../errors/app.error";
import { Request, Response } from "express";

class UserController {
  private userService: typeof usersService;

  constructor() {
    this.userService = usersService;
  }

  async create(req: Request, res: Response) {
    try {
      const validated = userCreateSchema.parse(req.body);
      const createdUser = await this.userService.insert(validated);
      return res.status(201).json({ ...createdUser });
    } catch (error) {
      if (error instanceof ZodError) {
        throw new AppErrors(error.flatten().fieldErrors);
      }
    }
  }

  async findAll(_: Request, res: Response) {
    const users = await this.userService.getUsers();
    return res.send({ users });
  }

  async findByCode(req: Request, res: Response) {
    const user = await this.userService.findByCode(req.params.code);
    return res.send(user);
  }
}

export default new UserController();
