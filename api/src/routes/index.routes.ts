import { Router } from "express";
import userRouter from "./users.routes";
import checkinRouter from "./checkin.routes";

const apiRouter: Router = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/checkin", checkinRouter);

export { apiRouter };
