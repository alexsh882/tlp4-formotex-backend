import { z } from "zod";
import { UserService } from "../features/users/user.service";
import { EquipmentTypesService } from "../features/equipment-types/equipment-types.service";

const equipmentTypeService = new EquipmentTypesService();
const userService = new UserService();

const bodyEquipmentSchema = z.object({
  model: z
    .string({ message: "El modelo es requerido" })
    .min(1, { message: "El modelo es requerido" }),

    characteristics: z.optional(
    z.string({ message: "Las observaciones son requeridas" }).min(1, {
      message: "Las observaciones son requeridas",
    })
  ),
  
  make_id: z
    .string({ message: "El tipo de equipo es requerido" })
    .uuid({ message: "El tipo de equipo es requerido" }),
    
  equipment_type_id: z
    .string({ message: "El tipo de equipo es requerido" })
    .uuid({ message: "El tipo de equipo es requerido" })
    .refine(
      async (equipment_type_id) => {
        const equipmentType = await equipmentTypeService.getEquipmentTypeById(
          equipment_type_id
        );

        return !!equipmentType;
      },
      { message: "El tipo de equipo no existe" }
    ),
});

export const CreateEquipmentSchema = z.object({
  body: bodyEquipmentSchema,
});

export const UpdateEquipmentSchema = z.object({
  body: bodyEquipmentSchema.partial(),
  params: z.object({
    id: z
      .string({ message: "El id es requerido" })
      .uuid({ message: "El id es requerido" }),
  }),
});
