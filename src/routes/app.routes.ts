import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { EquipmentTypeRoutes } from "./equipment-type.routes";

export class AppRouter {
  static get routes(): Router {
    const router = Router();

    router.use("/api", AuthRoutes.routes);
    router.use("/api", EquipmentTypeRoutes.routes);

    return router;
  }
}
