import { Router } from "express";
import Make from "../models/makes.model";
import { CreateMakeSchema, UpdateMakeSchema } from "../validations/make.schema";
import { validator } from "../middlewares/validator";
import { MakeController } from "../features/makes/make.controller";

export class MakesRoutes {
    static get routes(): Router {
        const router = Router();

        const makesController = new MakeController();

        router.get("/makes", makesController.getMakes);
        router.get("/makes/:id", makesController.getMakeById);
        router.post("/makes", validator(CreateMakeSchema), makesController.createMake);
        router.patch("/makes/:id", validator(UpdateMakeSchema), makesController.updateMake);
        router.delete("/makes/:id", makesController.deleteMake);

        return router;
    }
}