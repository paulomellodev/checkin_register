import { Router } from "express";
import { checkinsControllers } from "../controllers/checkins.controller";

const checkinRouter: Router = Router();

checkinRouter.post("/register/:userId", checkinsControllers.register);
checkinRouter.get("/:userId", checkinsControllers.retrieveCheckin);

export default checkinRouter;
