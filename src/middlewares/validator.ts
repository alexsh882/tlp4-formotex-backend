import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

// zod validator
export const validator = (schema: z.Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ message: "Datos inválidos", errors: error.issues });
      } else {
        res.status(500).json({ error: "Error interno del servidor" });
      }
    }
  };
};
