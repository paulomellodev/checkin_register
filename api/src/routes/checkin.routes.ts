import { Router, IRoute } from "express";
import usersController from "../controllers/users.controller";
import checkinsController from "../controllers/checkins.controller";

const router = Router();

class CheckinRoutes {
  public routes: Router;
  constructor(routerExpress: Router) {
    this.routes = routerExpress;
    this.buildRoutes();
  }

  private buildRoutes() {
    this.routes.post("/register", checkinsController.register);
    this.routes.get("/:id", checkinsController.retrieveCheckin);
  }
}

export default new CheckinRoutes(Router());
