import { z } from "zod";
import { MakeService } from "../features/makes/make.service";

const makeService = new MakeService()


const bodyMakeSchema = z.object({
  name: z
    .string({ message: "El nombre es requerido" })
    .min(1, {
      message: "El nombre es requerido",
    })
    .refine(
      async (value) => {
        return await makeService
          .getMakeByName(value)
          .then((result) => {
            if (result) {
              return false;
            }
            return true;
          });
      },
      { message: "El nombre ya existe" }
    ),
})

export const CreateMakeSchema = z.object({
  body: bodyMakeSchema,
});

export const UpdateMakeSchema = z
  .object({
    body: z.object({
      name: z.string({ message: "El nombre es requerido" }).min(1, {
        message: "El nombre es requerido",
      }),
    }),
    params: z.object({
      id: z.string({ message: "El id es requerido" }),
    }),
  })
  .refine(
    async (data) => {
      const name = data.body.name;
      const id = data.params.id;

      return await makeService
        .getMakeByName(name)
        .then((result) => {
          if (result && result.make_id !== id) {
            return false;
          }
          return true;
        });
    },
    { message: "El nombre ya existe" }
  );
