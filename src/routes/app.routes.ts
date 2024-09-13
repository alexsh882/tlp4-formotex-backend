import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { EquipmentTypeRoutes } from "./equipment-type.routes";
import { EquipmentRoutes } from "./equipment.routes";
import { isAuthenticated } from "../middlewares/authentication";
import { MakesRoutes } from "./makes.routes";
import { InventoryRoutes } from "./inventory.routes";
import { InventoryEntryRoutes } from "./inventory-entry.routes";

export class AppRouter {
  static get routes(): Router {
    const router = Router();

    router.use("/api/auth", AuthRoutes.routes);
    router.use("/api", isAuthenticated, EquipmentTypeRoutes.routes);
    router.use("/api", isAuthenticated, EquipmentRoutes.routes);
    router.use("/api", isAuthenticated, MakesRoutes.routes);
    router.use("/api", isAuthenticated, InventoryRoutes.routes);
    router.use("/api", isAuthenticated, InventoryEntryRoutes.routes);

    return router;
  }
}
