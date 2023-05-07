import express, { Application, Request, Response, Router, json } from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes";
import checkinRoutes from "./routes/checkin.routes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(json());
    this.routes("/users", usersRoutes.routes);
    this.routes("/checkin", checkinRoutes.routes);
  }

  private routes(endpoint: string, routes: Router): void {
    this.app.use(endpoint, routes);
  }
}

export default App;
