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
import checkinRouter from "./routes/checkin.routes";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { apiRouter } from "./routes/index.routes";

class App {
  public express: Application;
  constructor() {
    this.express = express();
    this.express.use(cors());
    this.express.use(json());
    this.express.use("/api", apiRouter);

    this.express.use(handleErrors);
  }
}

const app = new App();

export { app };
