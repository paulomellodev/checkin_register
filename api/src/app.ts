import express, { Application, Request, Response, Router, json } from "express";
import cors from "cors";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Opa o que aconteceu?");
});

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(json());
    this.routes("/", router);
  }

  private routes(endpoint: string, routes: Router): void {
    this.app.use(endpoint, routes);
  }
}

export default App;
