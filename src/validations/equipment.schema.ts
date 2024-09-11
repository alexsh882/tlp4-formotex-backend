import { z } from "zod";
import Equipment from "../models/equipment.model";
import { UserService } from "../features/users/user.service";
import User from "../models/users.model";
import { EquipmentTypesService } from "../features/equipment-types/equipment-types.service";
import EquipmentType from "../models/equipment-type.model";
import { EquipmentsService } from "../features/equipments/equipment.service";

const equipmentTypeService = new EquipmentTypesService(EquipmentType);
const equipmentService = new EquipmentsService(Equipment);
const userService = new UserService(User);

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
  user_id: z
    .string({ message: "El usuario es requerido" })
    .uuid({
      message: "El usuario es requerido",
    })
    .refine(
      async (user_id) => {
        const user = await userService.getUserById(user_id);
        return !!user;
      },
      { message: "El usuario no existe" }
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
