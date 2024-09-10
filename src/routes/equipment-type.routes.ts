import { Router } from "express";
import EquipmentType from "../models/equipment-type.model";
import { EquipmentTypesService } from "../features/equipment-types/equipment-types.service";
import { EquipmentTypeController } from "../features/equipment-types/equipment-types.controller";
import { validator } from "../middlewares/validator";
import { CreateEquipmentTypeSchema, UpdateEquipmentTypeSchema } from "../validations/equipment-type.schema";

export class EquipmentTypeRoutes {
  static get routes(): Router {
    const router = Router();

    const equipmentTypeService = new EquipmentTypesService(EquipmentType);

    const equipmentTypeController = new EquipmentTypeController(
      equipmentTypeService
    );

    router.get("/equipment-types", equipmentTypeController.getEquipmentTypes);

    router.post(
      "/equipment-types",
      validator(CreateEquipmentTypeSchema),
      equipmentTypeController.createEquipmentType
    );

    router.get(
      "/equipment-types/:id",
      equipmentTypeController.getEquipmentTypeById
    );

    router.put(
      "/equipment-types/:id",
      [validator(UpdateEquipmentTypeSchema)],
      equipmentTypeController.updateEquipmentType
    );

    router.delete(
      "/equipment-types/:id",
      equipmentTypeController.deleteEquipmentType
    );

    return router;
  }
}
