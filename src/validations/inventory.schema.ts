import { z } from "zod";
import { InventoryService } from "../features/inventories/inventory.service";

const inventoryService = new InventoryService();

export const CreateInventorySchema = z.object({
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

export const UpdateInventorySchema = z
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

      return await inventoryService.getInventoryByName(name).then((result) => {
        if (result && result.inventory_id !== id) {
          return false;
        }
        return true;
      });
    },
    { message: "El nombre ya existe" }
  );
