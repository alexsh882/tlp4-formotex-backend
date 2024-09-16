import { Router } from "express";
import { validator } from "../middlewares/validator";
import { UserController } from "../features/users/user.controllers";

export class UserRoutes {
  // constructor(private router : Router) {}

  static get routes(): Router {
    
    const router = Router();

    const userController = new UserController();

    // router.post("/register", validator(UserSignUpSchema), authController.signUp);

    // router.post("/login", validator(UserSignInSchema), authController.signIn);

    router.get("/users", userController.getUsers);

    return router;
  }
}
