import { Router } from "express";
import { InventoryService } from "../features/inventory/inventory.service";
import Inventory from "../models/inventory.model";
import { InventoryController } from "../features/inventory/inventory.controller";
import { validator } from "../middlewares/validator";
import {
  CreateInventorySchema,
  UpdateInventorySchema,
} from "../validations/inventory.schema";

export class InventoryRoutes {
  static get routes(): Router {
    const router = Router();

    const inventoryService = new InventoryService(Inventory);

    const inventoryController = new InventoryController(inventoryService);

    router.get("/inventories", inventoryController.getInventories);

    router.post(
      "/inventories",
      validator(CreateInventorySchema),
      inventoryController.createInventory
    );

    router.get("/inventories/:id", inventoryController.getInventoryById);

    router.patch(
      "/inventories/:id",
      validator(UpdateInventorySchema),
      inventoryController.updateInventory
    );

    router.delete("/inventories/:id", inventoryController.deleteInventory);

    return router;
  }
}
