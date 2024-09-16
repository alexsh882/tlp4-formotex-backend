import { Request, Response } from "express";
import { RoleService } from "./role.service";

export class RoleController {
    constructor(private roleService = new RoleService()) {}

    getRoles = async (req: Request, res: Response) => {
        try {
            const roles = await this.roleService.getRoles();
            res.status(200).json(roles);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}