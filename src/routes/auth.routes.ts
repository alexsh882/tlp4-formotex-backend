import { Router } from "express";
import { AuthController } from "../auth/auth.controller";
import { UserSignInSchema, UserSignUpSchema } from "../validations/auth.schema";
import { validator } from "../middlewares/validator";
import { isAuthenticated } from "../middlewares/authentication";

export class AuthRoutes {
  // constructor(private router : Router) {}

  static get routes(): Router {
    
    const router = Router();

    const authController = new AuthController();    

    router.post("/register", validator(UserSignUpSchema), authController.signUp);

    router.post("/login", validator(UserSignInSchema), authController.signIn);

    router.post("/logout", isAuthenticated, authController.logout);

    router.get("/profile", isAuthenticated, authController.getProfile);

    return router;
  }
}
