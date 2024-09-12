import { Router } from "express";
import Inventory from "../models/inventory.model";
import { validator } from "../middlewares/validator";
import {
  CreateInventorySchema,
  UpdateInventorySchema,
} from "../validations/inventory.schema";
import { InventoryController } from "../features/inventories/inventory.controller";

export class InventoryRoutes {
  static get routes(): Router {
    const router = Router();

    const inventoryController = new InventoryController();

    router.get("/inventories", inventoryController.getInventories);

    router.post("/inventories",validator(CreateInventorySchema),inventoryController.createInventory);

    router.get("/inventories/:id", inventoryController.getInventoryById);

    router.patch("/inventories/:id",validator(UpdateInventorySchema),inventoryController.updateInventory);

    router.delete("/inventories/:id", inventoryController.deleteInventory);

    return router;
  }
}
