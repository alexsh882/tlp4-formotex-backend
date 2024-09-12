import { Request, Response } from "express";
import { InventoryService } from "./inventory.service";

export class InventoryController {
  constructor(private inventoryService: InventoryService= new InventoryService) {}

  getInventories = async (req: Request, res: Response) => {
    try {
      const inventories = await this.inventoryService.getInventories();
      res.status(200).json(inventories);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  createInventory = async (req: Request, res: Response) => {
    try {
      const inventory = this.inventoryService.createInventory(req.body);
      res.status(201).json(inventory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getInventoryById = async (req: Request, res: Response) => {
    try {
      const inventory = this.inventoryService.getInventoryById(req.params.id);
      res.status(200).json(inventory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  updateInventory = async (req: Request, res: Response) => {
    try {
      const inventory = this.inventoryService.updateInventory(
        req.params.id,
        req.body
      );
      res.status(200).json(inventory);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  deleteInventory = async (req: Request, res: Response) => {
    try {
      await this.inventoryService.deleteInventory(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
