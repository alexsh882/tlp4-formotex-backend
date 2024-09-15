import { Optional } from "sequelize";

export interface IInventoryAttributes {
  inventory_id: string;
  name: string;
}

export interface IInventoryCreationAttributes
  extends Optional<IInventoryAttributes, "inventory_id"> {}

export interface IInventoryUpdateAttributes
  extends Partial<IInventoryCreationAttributes> {}
