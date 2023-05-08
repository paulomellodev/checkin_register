import { Router } from "express";
import { register, retrieveCheckin } from "../controllers/checkins.controller";

const checkinRouter: Router = Router();

checkinRouter.post("/register", register);
checkinRouter.get("/:id", retrieveCheckin);

export default checkinRouter;
