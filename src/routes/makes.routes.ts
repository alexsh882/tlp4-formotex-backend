import { Router } from "express";
import { MakeController } from "../features/make/make.controller";
import { MakeService } from "../features/make/make.service";
import Make from "../models/makes.model";
import { CreateMakeSchema, UpdateMakeSchema } from "../validations/make.schema";
import { validator } from "../middlewares/validator";

export class MakesRoutes {
    static get routes(): Router {
        const router = Router();

        const makeService = new MakeService(Make);

        const makesController = new MakeController(makeService);

        router.get("/makes", makesController.getMakes);
        router.get("/makes/:id", makesController.getMakeById);
        router.post("/makes", validator(CreateMakeSchema), makesController.createMake);
        router.patch("/makes/:id", validator(UpdateMakeSchema), makesController.updateMake);
        router.delete("/makes/:id", makesController.deleteMake);

        return router;
    }
}