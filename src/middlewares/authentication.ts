import { NextFunction, Request, Response } from "express";
import { AuthService } from "../auth/auth.service";
import User from "../models/users.model";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);    
    
  }

  const authService = new AuthService();

  try {
    if (token) {
      const user = await authService.getProfile(token);
      if (user) {
        req.user = user as User;
        return next();
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Tenes que iniciar sesión." });
  }

  return res.status(401).json({ message: "Tenes que iniciar sesión para continuar." });
};