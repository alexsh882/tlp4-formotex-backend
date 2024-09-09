import { Request, Response, Router } from "express";
import { AuthRoutes } from "./auth.routes";

export class AppRouter {
  static get routes(): Router {
    const router = Router();

    // Auth routes
    const authRoutes = new AuthRoutes(router);
    router.use(authRoutes.routes());

    return router
  }
}
