import InventoryEntry from "../../models/inventory-entry.model";
import Inventory from "../../models/inventory.model";
import {
  IInventoryCreationAttributes,
  IInventoryUpdateAttributes,
} from "./interfaces/inventory";

export class InventoryService {
  constructor(private inventoryModel: typeof Inventory = Inventory) {}

  async createInventory(inventory: IInventoryCreationAttributes) {
    return await this.inventoryModel.create({
      name: inventory.name,
    });
  }

  async getInventories() {
    return await this.inventoryModel.findAll({
      order: [["name", "ASC"]],
    });
  }

  async getInventoryById(id: string) {
    return await this.inventoryModel.findByPk(id);
  }

  async getInventoryByName(name: string) {
    return await this.inventoryModel.findOne({
      where: { name },
    });
  }

  async updateInventory(id: string, inventory: IInventoryUpdateAttributes) {
    const foundInventory = await this.inventoryModel.findByPk(id);

    if (!foundInventory) {
      throw new Error("Inventario no encontrado.");
    }

    return await this.inventoryModel.update(
      {
        name: inventory.name,
      },
      {
        where: { inventory_id: foundInventory.inventory_id },
      }
    );
  }

  async deleteInventory(id: string) {
    const foundInventory = await this.inventoryModel.findByPk(id, {
      include: [
        {
          model: InventoryEntry,
          as: "inventory_entries",
        },
      ],
    });

    if (!foundInventory) {
      throw new Error("Inventario no encontrado.");
    }

    if (foundInventory.inventory_entries.length > 0) {
      throw new Error("El inventario tiene entradas asociadas, no se puede eliminar.");
    }


    return await foundInventory.destroy();
  }
}
