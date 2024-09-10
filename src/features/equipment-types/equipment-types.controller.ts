import { Request, Response } from "express";
import { EquipmentTypesService } from "./equipment-types.service";

export class EquipmentTypeController {
  constructor(private equipmentTypesService: EquipmentTypesService) {}

  createEquipmentType = async (req: Request, res: Response) => {
    try {
      const equipmentType =
        await this.equipmentTypesService.createEquipmentType(req.body);
      res.status(201).send(equipmentType);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

  getEquipmentTypes = async (_: Request, res: Response) => {
    try {      
      const equipmentTypes = await this.equipmentTypesService.getEquipmentTypes();
      console.log("getEquipmentTypes", {equipmentTypes});
      res.status(200).send(equipmentTypes);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

  getEquipmentTypeById = async (req: Request, res: Response) => {
    try {
      const equipmentType =
        await this.equipmentTypesService.getEquipmentTypeById(req.params.id);
      res.status(200).send(equipmentType);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

  updateEquipmentType = async (req: Request, res: Response) => {
    try {
      await this.equipmentTypesService.updateEquipmentType(
        req.params.id,
        req.body
      );
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

  deleteEquipmentType = async (req: Request, res: Response) => {
    try {
      await this.equipmentTypesService.deleteEquipmentType(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };
}
