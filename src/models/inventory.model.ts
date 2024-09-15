import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  PrimaryKey,
  Default,
  DataType,
} from "sequelize-typescript";

import { Optional } from "sequelize";
import InventoryEntry from "./inventory-entry.model";
import { IInventoryAttributes, IInventoryCreationAttributes } from "../features/inventories/interfaces/inventory";

@Table({
  tableName: "inventories",
  paranoid: true,
  timestamps: true,
})
export default class Inventory extends Model<
  IInventoryAttributes,
  IInventoryCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  inventory_id: string;

  @Column(DataType.STRING)
  name: string;

  @HasMany(() => InventoryEntry)
  users: InventoryEntry[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
