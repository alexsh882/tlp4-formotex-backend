import { Router } from "express";
import Equipment from "../models/equipment.model";
import { EquipmentsService } from "../features/equipments/equipment.service";
import { EquipmentController } from "../features/equipments/equipment.controller";
import { validator } from "../middlewares/validator";
import {
  CreateEquipmentSchema,
  UpdateEquipmentSchema,
} from "../validations/equipment.schema";

export class EquipmentRoutes {
  static get routes(): Router {
    const router = Router();

    const equipmentController = new EquipmentController();

    router.get("/equipments", equipmentController.getEquipments);

    router.post(
      "/equipments",
      validator(CreateEquipmentSchema),
      equipmentController.createEquipment
    );

    router.get("/equipments/:id", equipmentController.getEquipmentById);

    router.patch(
      "/equipments/:id",
      [validator(UpdateEquipmentSchema)],
      equipmentController.updateEquipment
    );

    router.delete("/equipments/:id", equipmentController.deleteEquipment);

    return router;
  }
}
