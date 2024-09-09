import { NextFunction, Request, Response } from "express";
import { z, ZodError } from 'zod';


// zod validator
export const validator = (schema: z.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
    
        try {
            schema.parse(req.body);
            next();
          } catch (error) {
            if (error instanceof ZodError) {            
              res.status(400).json({ message: 'Datos inválidos', errors: error.issues });
            } else {
              res.status(500).json({ error: 'Error interno del servidor' });
            }
          }
    }
}