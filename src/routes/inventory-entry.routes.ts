import { Router } from "express";
import { InventoryEntriesController } from "../features/inventory-entries/inventory-entries.controller";
import { validator } from "../middlewares/validator";
import {
  CreateInventoryEntrySchema,
  UpdateInventoryEntrySchema,
} from "../validations/inventory_entry.chema";

export class InventoryEntryRoutes {
  static get routes(): Router {
    const router = Router();

    const inventoryEntriesController = new InventoryEntriesController();

    router.get(
      "/inventory-entries",
      inventoryEntriesController.getInventoryEntries
    );

    router.get(
      "/inventory-entries/available",
      inventoryEntriesController.getAvailableInventoryEntries
    );

    router.post(
      "/inventory-entries",
      validator(CreateInventoryEntrySchema),
      inventoryEntriesController.createInventoryEntry
    );

    router.get(
      "/inventory-entries/:id",
      inventoryEntriesController.getInventoryEntryById
    );

    router.patch(
      "/inventory-entries/:id",
      validator(UpdateInventoryEntrySchema),
      inventoryEntriesController.updateInventoryEntry
    );

    router.patch(
      "/inventory-entries/:id/out",
      validator(UpdateInventoryEntrySchema),
      inventoryEntriesController.outInventoryEntry
    );

    router.delete(
      "/inventory-entries/:id",
      inventoryEntriesController.deleteInventoryEntry
    );

    return router;
  }
}
