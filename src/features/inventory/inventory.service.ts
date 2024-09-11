import Inventory from "../../models/inventory.model";
import { CreateInventoryDto, UpdateInventoryDto } from "./dto/inventory.dto";

export class InventoryService {
  constructor(private inventoryModel: typeof Inventory) {}

  async createInventory(inventory: CreateInventoryDto) {
    return await this.inventoryModel.create(inventory);
  }

  async getInventories() {
    return await this.inventoryModel.findAll({});
  }

  async getInventoryById(id: string) {
    return await this.inventoryModel.findByPk(id);
  }

  async getInventoryByName(name: string) {
    return await this.inventoryModel.findOne({
      where: { name },
    });
  }

  async updateInventory(id: string, inventory: UpdateInventoryDto) {
    const foundInventory = await this.inventoryModel.findByPk(id);

    if (!foundInventory) {
      throw new Error("Inventory not found");
    }

    return await this.inventoryModel.update(inventory, {
      where: { inventory_id: foundInventory.inventory_id },
    });
  }

  async deleteInventory(id: string) {
    return await this.inventoryModel.destroy({
      where: { inventory_id: id },
    });
  }
}
