import { Router } from "express";
import { validator } from "../middlewares/validator";
import { UserController } from "../features/users/user.controllers";
import { UserUpdateSchema } from "../validations/user.schema";

export class UserRoutes {
  // constructor(private router : Router) {}

  static get routes(): Router {
    
    const router = Router();

    const userController = new UserController();

    // router.post("/register", validator(UserSignUpSchema), authController.signUp);

    // router.post("/login", validator(UserSignInSchema), authController.signIn);

    router.get("/users", userController.getUsers);

    router.post("/users", userController.createUser);

    router.get("/users/:id", userController.getUserById);

    router.patch("/users/:id", validator(UserUpdateSchema), userController.updateUser);

    router.patch("/users/:id/upload-password", userController.updatePassword);

    router.delete("/users/:id", userController.deleteUser);


    return router;
  }
}
