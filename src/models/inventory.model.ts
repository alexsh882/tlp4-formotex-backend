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
import { InventoryEntries } from "./inventory-entry.model";

interface InventoryAttributes {
  inventory_id: string;
  name: string;
}

interface InventoryCreationAttributes extends Optional<InventoryAttributes, "inventory_id"> {}

@Table({
  tableName: "inventories",
  paranoid: true,
  timestamps: true,
})
export default class Inventory extends Model<
  InventoryAttributes,
  InventoryCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  inventory_id: string;

  @Column({
    unique: true,
  })
  name: string;

  @HasMany(() => InventoryEntries)
  users: InventoryEntries[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
