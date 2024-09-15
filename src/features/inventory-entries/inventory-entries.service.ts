import { IsNull } from "sequelize-typescript";
import InventoryEntry, { InventoryEntriesCreationAttributes, InventoryEntriesUpdateAttributes } from "../../models/inventory-entry.model";
import { Op } from "sequelize";
import Equipment from "../../models/equipment.model";
import Inventory from "../../models/inventory.model";
import User from "../../models/users.model";

export class InventoryEntriesService {
  constructor(
    private inventoryEntriesModel: typeof InventoryEntry = InventoryEntry
  ) {}

  async createInventoryEntry(inventoryEntry: InventoryEntriesCreationAttributes): Promise<InventoryEntry> {
    return await this.inventoryEntriesModel.create(inventoryEntry);
  }

  async getInventoryEntries() : Promise<InventoryEntry[]> {
    return await this.inventoryEntriesModel.findAll({
     include:[
        { model: Equipment, as: 'equipment' },
        { model: Inventory, as: 'inventory' },
        { model: User, as: 'user', attributes: ['user_id', 'names'] }
     ] 
    });
  }

  async getAvailableInventoryEntries() : Promise<InventoryEntry[]> {
    return await this.inventoryEntriesModel.findAll({
      where: {
        date_out: {
          [Op.is]: null,
        }
      }
    });
  }

  async getInventoryEntryById(id: string) : Promise<InventoryEntry | null> {
    return await this.inventoryEntriesModel.findByPk(id);
  }

  async updateInventoryEntry(
    id: string,
    inventoryEntry: InventoryEntriesUpdateAttributes
  )  {
    const foundedInventoryEntry = await this.inventoryEntriesModel.findByPk(id);

    if (!foundedInventoryEntry) {
      throw new Error("No se encontró el registro de entrada de inventario.");
    }

    return await this.inventoryEntriesModel.update(inventoryEntry, {
      where: { inventory_entry_id: id },
    });
  }

  async outInventoryEntry(id: string) {
    const foundedInventoryEntry = await this.inventoryEntriesModel.findByPk(id);

    if (!foundedInventoryEntry) {
      throw new Error("No se encontró el registro de entrada de inventario.");
    }

    return await this.inventoryEntriesModel.update(
      { date_out: new Date() },
      {
        where: { inventory_entry_id: id },
      }
    );
  }

  async deleteInventoryEntry(id: string) {
    const foundedInventoryEntry = await this.inventoryEntriesModel.findByPk(id);

    if (!foundedInventoryEntry) {
      throw new Error("No se encontró el registro de entrada de inventario.");
    }

    return await this.inventoryEntriesModel.destroy({
      where: { inventory_entry_id: id },
    });
  }
}
