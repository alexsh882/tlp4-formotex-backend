import {
  Table,
  Column,
  Model,
  HasMany,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
  Default,
} from "sequelize-typescript";

import Equipment from "./equipment.model";
import { IEquipmentTypeAttributes, IEquipmentTypeCreationAttributes } from "../features/equipment-types/interfaces/equipment-type";

@Table({
  tableName: "equipment_types",
  paranoid: true,
  timestamps: true,
})
export default class EquipmentType extends Model<
  IEquipmentTypeAttributes,
  IEquipmentTypeCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  equipment_type_id: string;

  @Column({
    unique: true,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Equipment)
  equipments: Equipment[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
