import "express-async-errors";
import express, {
  Application,
  NextFunction,
  Request,
  Response,
  Router,
  json,
} from "express";
import cors from "cors";
import userRouter from "./routes/users.routes";
import AppErrors from "./errors/app.error";
import { prismaClient } from "./database/prismaClient";
import checkinRouter from "./routes/checkin.routes";

const app: Application = express();
app.use(cors());
app.use(json());
app.get("/me", async (req, res) => {
  const result = await prismaClient.user.findMany();
  res.json(result);
});
app.use("/users", userRouter);
app.use("/checkin", checkinRouter);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppErrors) {
      return response.status(err.status).json({
        error: err.message,
      });
    }
    return response.status(400).json({
      error: err.message,
    });
  }
);
export default app;
