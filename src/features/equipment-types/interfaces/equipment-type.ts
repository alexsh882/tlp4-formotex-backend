import { Optional } from "sequelize";

export interface IEquipmentTypeAttributes {
    equipment_type_id: string;
    name: string;
  }
  

export interface IEquipmentTypeCreationAttributes
  extends Optional<IEquipmentTypeAttributes, "equipment_type_id"> {}

export interface IEquipmentTypeUpdateAttributes
  extends Partial<IEquipmentTypeCreationAttributes> {}