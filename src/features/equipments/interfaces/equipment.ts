import { Optional } from "sequelize";

export interface IEquipmentAttributes {
  equipment_id: number;
  model: string;
  characteristics: string;
  make_id: string;
  equipment_type_id: string;
  user_id: string;
}

export interface IEquipmentCreationAttributes
  extends Optional<IEquipmentAttributes, "equipment_id"> {}

export interface IEquipmentUpdateAttributes
  extends Partial<IEquipmentCreationAttributes> {}
