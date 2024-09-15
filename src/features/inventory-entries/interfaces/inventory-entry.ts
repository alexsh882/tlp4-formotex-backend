import { Optional } from "sequelize";

export interface IInventoryEntriesAttributes {
  inventory_entry_id: number;
  serial: string;
  status: string;
  date_in: Date;
  date_out?: Date | null;
  observations: string;
  equipment_id: string;
  inventory_id: string;
  user_id: string;
}

export interface IInventoryEntriesCreationAttributes
  extends Optional<IInventoryEntriesAttributes, "inventory_entry_id"> {}

export interface IInventoryEntriesUpdateAttributes
  extends Partial<IInventoryEntriesAttributes> {}
