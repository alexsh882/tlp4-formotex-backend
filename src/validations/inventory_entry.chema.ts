import { z } from "zod";
import { UserService } from "../features/users/user.service";
import { EquipmentsService } from "../features/equipments/equipment.service";
import { EquipmentStatus } from "../models/inventory-entry.model";
import { InventoryService } from "../features/inventories/inventory.service";

const inventoryService = new InventoryService();
const equipmentService = new EquipmentsService();
const userService = new UserService();

const bodyInventoryEntrySchema = z.object({
  serial: z.string({ message: "El número de serie es requerido" }).min(1, {
    message: "El número de serie es requerido",
  }),

  status: z.nativeEnum(EquipmentStatus, {
    message: "El estado es requerido",
  }),
  date_in: z.date({
    message: "La fecha de ingreso es requerida",
    coerce: true,
  }),
  date_out: z
    .date({
      message: "La fecha de salida debe tener un formato correcto.",
      coerce: true,
    })
    .optional(),
  observations: z.optional(
    z.string({ message: "Las observaciones son requeridas" }).min(1, {
      message: "Las observaciones son requeridas",
    })
  ),
  equipment_id: z
    .string({ message: "El equipo es requerido" })
    .uuid({ message: "El equipo es requerido" })
    .refine(
      async (equipment_id) => {
        const equipment = await equipmentService.getEquipmentById(equipment_id);

        return !!equipment;
      },
      { message: "El equipo no existe" }
    ),
  inventory_id: z
    .string({ message: "El inventario es requerido" })
    .uuid({ message: "El inventario es requerido" })
    .refine(
      async (inventory_id) => {
        const inventory = await inventoryService.getInventoryById(inventory_id);
        return !!inventory;
      },
      { message: "El inventario no existe" }
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

export const CreateInventoryEntrySchema = z.object({
  body: bodyInventoryEntrySchema,
});

export const UpdateInventoryEntrySchema = z.object({
  body: bodyInventoryEntrySchema.partial(),
  params: z.object({
    id: z
      .string({ message: "El id es requerido" })
      .uuid({ message: "El id es requerido" }),
  }),
});