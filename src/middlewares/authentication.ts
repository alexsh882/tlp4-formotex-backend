import { NextFunction, Request, Response } from "express";
import { AuthService } from "../auth/auth.service";
import User from "../models/users.model";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);    
    
  }

  const authService = new AuthService(User);

  if (token) {
    const user = await authService.verifyToken(token);
    if (user) {
      req.user = user as User;
      return next();
    }
  }

  return res.status(401).json({ message: "Tenes que iniciar sesión para continuar." });
};