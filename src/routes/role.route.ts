import { Router } from "express";
import { validator } from "../middlewares/validator";
import { RoleController } from "../features/roles/role.controller";

export class RoleRoutes {
  // constructor(private router : Router) {}

  static get routes(): Router {
    
    const router = Router();

    const roleController = new RoleController();

    
    router.get("/roles", roleController.getRoles);

    return router;
  }
}
