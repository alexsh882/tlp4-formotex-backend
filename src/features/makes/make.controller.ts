import { Request, Response } from "express";
import { MakeService } from "./make.service";

export class MakeController {
  constructor(private makeService: MakeService =new MakeService) {}

  createMake = async (req: Request, res: Response) => {
    try {
      const make = await this.makeService.createMake(req.body);
      res.status(201).json(make);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getMakes = async (req: Request, res: Response) => {
    try {
      const makes = await this.makeService.getMakes();
      res.status(200).json(makes);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  getMakeById = async (req: Request, res: Response) => {
   try {
    const make = await this.makeService.getMakeById(req.params.id);
    res.status(200).json(make);
   } catch (error) {
    
   }
  };

  updateMake = async (req: Request, res: Response) => {
    try {
      await this.makeService.updateMake(req.params.id, req.body);
      res.status(200).json({
        message: "Make has been updated successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  deleteMake = async (req: Request, res: Response) => {
    try {
      await this.makeService.deleteMake(req.params.id);
      res.status(200).json({
        message: "Make has been deleted successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
