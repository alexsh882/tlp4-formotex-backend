import { Request, Response, Router } from "express";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import User from "../models/users.model";
import Role from "../models/role.model";
import { UserSignInSchema, UserSignUpSchema } from "../validations/auth.schema";
import { validator } from "../validations/validator";

export class AuthRoutes {
  constructor(private router : Router) {
    this.router = router;
  }

  routes(): Router {
    
    const authService = new AuthService(User, Role);

    const authController = new AuthController(authService);    


    this.router.post("/api/auth/register", validator(UserSignUpSchema), authController.signUp);

    this.router.post("/api/auth/login", validator(UserSignInSchema), authController.signIn);

    this.router.post("/api/auth/logout", authController.logout);

    return this.router;
  }
}
