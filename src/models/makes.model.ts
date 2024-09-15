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

import Equipment from "./equipment.model";
import { IMakeAttributes, IMakeCreationAttributes } from "../features/makes/interfaces/make";



@Table({
  tableName: "makes",
  paranoid: true,
  timestamps: true,
})
export default class Make extends Model<
  IMakeAttributes,
  IMakeCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  make_id: string;

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
