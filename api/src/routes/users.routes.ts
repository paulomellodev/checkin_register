import { Router, IRoute } from "express";
import usersController from "../controllers/users.controller";

class UserRoutes {
  public routes: Router;
  constructor(routerExpress: Router) {
    this.routes = routerExpress;
    this.buildRoutes();
  }

  private buildRoutes() {
    this.routes.post("/register", usersController.create);
    this.routes.get("/", usersController.findAll);
    this.routes.get("/:code", usersController.findByCode);
  }
}

export default new UserRoutes(Router());
