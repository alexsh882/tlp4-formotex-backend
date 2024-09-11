import { z } from "zod";
import { EquipmentsService } from "../features/equipments/equipment.service";
import Equipment, { EquipmentStatus } from "../models/equipment.model";
import { UserService } from "../features/users/user.service";
import User from "../models/users.model";

const equipmentService = new EquipmentsService(Equipment);
const userService = new UserService(User);

const bodyEquipmentSchema = z.object({
  make: z.string({ message: "La marca es requerida" }).min(1, {
    message: "La marca es requerida",
  }),
  model: z
    .string({ message: "El modelo es requerido" })
    .min(1, { message: "El modelo es requerido" }),

  status: z.nativeEnum(EquipmentStatus, {
    message: "El estado es requerido",
  }),
  location: z.string({ message: "La ubicación es requerida" }).min(1, {
    message: "La ubicación es requerida",
  }),
  date_of_acquisition: z.date({
    message: "La fecha de adquisición es requerida",
  }),
  observations: z.optional(
    z.string({ message: "Las observaciones son requeridas" }).min(1, {
      message: "Las observaciones son requeridas",
    })
  ),
  equipment_type_id: z
    .string({ message: "El tipo de equipo es requerido" })
    .uuid({ message: "El tipo de equipo es requerido" })
    .refine(
      async (equipment_type_id) => {
        const equipmentType = await equipmentService.getEquipmentById(
          equipment_type_id
        );
        return !!equipmentType;
      },
      { message: "El tipo de equipo no existe" }
    ),
  user_id: z.string({ message: "El usuario es requerido" }).uuid({
    message: "El usuario es requerido",
  }).refine(
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
    id: z.string({ message: "El id es requerido" }),
  }),
});
