import { z } from "zod";
import { InventoryService } from "../features/inventory/inventory.service";
import Inventory from "../models/inventory.model";

const inventoryService = new InventoryService(Inventory);

export const CreateEquipmentTypeSchema = z.object({
  body: z.object({
    name: z
      .string({ message: "El nombre es requerido" })
      .min(1, {
        message: "El nombre es requerido",
      })
      .refine(
        async (value) => {
          return await inventoryService
            .getInventoryByName(value)
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

      return await inventoryService
        .getInventoryByName(name)
        .then((result) => {
          if (result && result.inventory_id !== id) {
            return false;
          }
          return true;
        });
    },
    { message: "El nombre ya existe" }
  );
