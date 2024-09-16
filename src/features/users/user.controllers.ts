import { Request, Response } from "express";
import { UserService } from "./user.service";

export class UserController {
    constructor(private userService = new UserService()) {}

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    };

}