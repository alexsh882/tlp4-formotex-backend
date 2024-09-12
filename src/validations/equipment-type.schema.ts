import { z } from "zod";
import { EquipmentTypesService } from "../features/equipment-types/equipment-types.service";

const equipmentTypeService = new EquipmentTypesService();

export const CreateEquipmentTypeSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "El nombre es requerido" })
      .min(1, {
        message: "El nombre es requerido",
      })
      .refine(
        async (value) => {
          return await equipmentTypeService
            .getEquipmentTypeByName(value)
            .then((result) => {
              if (result) {
                return false;
              }
              return true;
            });
        },
        { message: "El nombre ya existe" }
      ),
  }),
});

export const UpdateEquipmentTypeSchema = z
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

      return await equipmentTypeService
        .getEquipmentTypeByName(name)
        .then((result) => {
          if (result && result.equipment_type_id !== id) {
            return false;
          }
          return true;
        });
    },
    { message: "El nombre ya existe" }
  );
