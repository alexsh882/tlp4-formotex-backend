import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import Role from "../models/role.model";
import User from "../models/users.model";

export class AuthController {
  
  constructor(private authService: AuthService) {}

  signUp = async (req: Request, res: Response) => {
    try {
      const { names, username, password } = req.body;
      const { user, token } = await this.authService.signUp({
        names,
        username,
        password,
      });
      return res.status(201).json({ user, token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const { user, token } = await this.authService.signIn({
        username,
        password,
      });
      return res.status(200).json({ user, token });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };

  logout = async (req: Request, res: Response) => {
    const id = req.user?.user_id;

    if (!id) {
      return res.status(400).json({ message: "No se encontró el usuario" });
    }

    try {
      req.user = undefined;

      res.json({ message: "Cerraste sesión correctamente" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };
}
