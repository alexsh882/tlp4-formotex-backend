import { Request, Response } from "express";
import { InventoryEntriesService } from "./inventory-entries.service";

export class InventoryEntriesController {
  constructor(
    private inventoryEntriesService: InventoryEntriesService = new InventoryEntriesService()
  ) {}

  createInventoryEntry = async (req: Request, res: Response) => {
    try {
      const inventoryEntry =
        await this.inventoryEntriesService.createInventoryEntry(req.body);
      res.status(201).json(inventoryEntry);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getInventoryEntries = async (req: Request, res: Response) => {
    try {
      const inventoryEntries =
        await this.inventoryEntriesService.getInventoryEntries();
      res.status(200).json(inventoryEntries);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getAvailableInventoryEntries = async (req: Request, res: Response) => {
    try {
      const inventoryEntries =
        await this.inventoryEntriesService.getAvailableInventoryEntries();
      res.status(200).json(inventoryEntries);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getInventoryEntryById = async (req: Request, res: Response) => {
    try {
      const inventoryEntry =
        await this.inventoryEntriesService.getInventoryEntryById(req.params.id);
      res.status(200).json(inventoryEntry);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  updateInventoryEntry = async (req: Request, res: Response) => {
    try {
      await this.inventoryEntriesService.updateInventoryEntry(
        req.params.id,
        req.body
      );
      res
        .status(200)
        .json({
          message: "La entrada de inventario se ha actualizado correctamente",
        });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  outInventoryEntry = async (req: Request, res: Response) => {
    try {
      await this.inventoryEntriesService.outInventoryEntry(req.params.id);
      res
        .status(200)
        .json({
          message: "La entrada de inventario se ha actualizado correctamente",
        });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteInventoryEntry = async (req: Request, res: Response) => {
    try {
      await this.inventoryEntriesService.deleteInventoryEntry(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
