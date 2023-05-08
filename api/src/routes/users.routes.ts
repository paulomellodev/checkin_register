import { Router } from "express";
import { create, findAll, findByUser } from "../controllers/users.controller";

const userRouter: Router = Router();

userRouter.post("/register", create);
userRouter.get("/", findAll);
userRouter.get("/:code", findByUser);

export default userRouter;
