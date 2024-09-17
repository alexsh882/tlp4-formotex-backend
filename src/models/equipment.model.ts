import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  PrimaryKey,
  DataType,
  Default,
  HasMany,
} from "sequelize-typescript";

import EquipmentType from "./equipment-type.model";
import User from "./users.model";
import Make from "./makes.model";
import { IEquipmentAttributes, IEquipmentCreationAttributes } from "../features/equipments/interfaces/equipment";
import InventoryEntry from "./inventory-entry.model";

@Table({
  tableName: "equipments",
  paranoid: true,
  timestamps: true,
})
export default class Equipment extends Model<
  IEquipmentAttributes,
  IEquipmentCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  equipment_id: string;

  @Column({})
  model: string;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  characteristics: string;

  @ForeignKey(() => Make)
  make_id: string;

  @ForeignKey(() => EquipmentType)
  equipment_type_id: string;

  @ForeignKey(() => User)
  user_id: string;

  @BelongsTo(() => Make)
  make: Make;

  @BelongsTo(() => EquipmentType)
  equipment_type: EquipmentType;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => InventoryEntry)
  inventory_entries: InventoryEntry[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
