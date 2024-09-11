import { Request, Response } from "express";
import { EquipmentsService } from "./equipment.service";

export class EquipmentController {
  constructor(private equipmentService: EquipmentsService) {}

  createEquipment = async (req: Request, res: Response) => {
    try {
      const equipment = await this.equipmentService.createEquipment(req.body);
      res.status(201).json(equipment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getEquipments = async (req: Request, res: Response) => {
    try {
      const equipments = await this.equipmentService.getEquipments();
      res.status(200).json(equipments);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getEquipmentById = async (req: Request, res: Response) => {
    try {
      const equipment = await this.equipmentService.getEquipmentById(
        req.params.id
      );
      res.status(200).json(equipment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  updateEquipment = async (req: Request, res: Response) => {
    try {
      const equipment = await this.equipmentService.updateEquipment(
        req.params.id,
        req.body
      );
      res.status(200).json(equipment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  deleteEquipment = async (req: Request, res: Response) => {
    try {
      await this.equipmentService.deleteEquipment(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
