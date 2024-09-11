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
} from "sequelize-typescript";
import { Optional } from "sequelize";
import EquipmentType from "./equipment-type.model";
import User from "./users.model";

interface EquipmentAttributes {
  equipment_id: number;
  make: string;
  model: string;
  status: string;
  warehouse: string;
  date_of_acquisition: Date;
  observations: string;
  equipment_type_id: string;
  user_id: string;
}

interface EquipmentCreationAttributes
  extends Optional<EquipmentAttributes, "equipment_id"> {}

export enum EquipmentStatus {
  REPAIRED = "repaired",
  UNDER_REPAIR = "under_repair",
  MAINTENANCE = "maintenance",
  DISPOSED = "disposed",
}

export const ENUM_EQUIPMENT_STATUS = Object.values(EquipmentStatus);

@Table({
  tableName: "equipments",
  paranoid: true,
  timestamps: true,
})
export default class Equipment extends Model<
  EquipmentAttributes,
  EquipmentCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  equipment_id: string;

  @Column({})
  make: string;

  @Column({})
  model: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(EquipmentStatus),
  })
  status: string;

  @Column({
    allowNull: true,
  })
  warehouse: string;

  @Column({
    allowNull: true,
  })
  date_of_acquisition: Date;

  @Column({
    allowNull: true,
    type: DataType.TEXT,
  })
  observations: string;

  @ForeignKey(() => EquipmentType)
  equipment_type_id: string;

  @ForeignKey(() => User)
  user_id: string;

  @BelongsTo(() => EquipmentType)
  equipment_type: EquipmentType;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
