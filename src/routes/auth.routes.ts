import { Request, Response, Router } from "express";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import User from "../models/users.model";
import Role from "../models/role.model";
import { UserSignInSchema, UserSignUpSchema } from "../validations/auth.schema";
import { validator } from "../middlewares/validator";
import { isAuthenticated } from "../middlewares/authentication";

export class AuthRoutes {
  // constructor(private router : Router) {}

  static get routes(): Router {
    
    const router = Router();

    const authService = new AuthService(User, Role);

    const authController = new AuthController(authService);    

    router.post("/auth/register", validator(UserSignUpSchema), authController.signUp);

    router.post("/auth/login", validator(UserSignInSchema), authController.signIn);

    router.post("/auth/logout", isAuthenticated, authController.logout);

    return router;
  }
}
