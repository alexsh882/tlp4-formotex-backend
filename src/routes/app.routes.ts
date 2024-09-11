import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { EquipmentTypeRoutes } from "./equipment-type.routes";
import { EquipmentRoutes } from "./equipment.routes";
import { isAuthenticated } from "../middlewares/authentication";

export class AppRouter {
  static get routes(): Router {
    const router = Router();

    router.use("/api", AuthRoutes.routes);
    router.use("/api", isAuthenticated, EquipmentTypeRoutes.routes);
    router.use("/api", isAuthenticated, EquipmentRoutes.routes);

    return router;
  }
}
