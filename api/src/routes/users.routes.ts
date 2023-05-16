import { Router } from "express";
import { usersControllers } from "../controllers/users.controller";

const userRouter: Router = Router();

userRouter.post("/register", usersControllers.create);
userRouter.get("/", usersControllers.findAll);
userRouter.get("/:code", usersControllers.findOneUser);

export default userRouter;
