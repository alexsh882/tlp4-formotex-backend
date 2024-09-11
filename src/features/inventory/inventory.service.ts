import Inventory from "../../models/inventory.model";

export class InventoryService {
  constructor(private inventoryModel: typeof Inventory) {}

  async createInventory(inventory: any) {
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
}
