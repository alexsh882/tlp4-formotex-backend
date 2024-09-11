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
import Equipment from "./equipment.model";

interface MakeAttributes {
  make_id: string;
  name: string;
}

interface MakeCreationAttributes extends Optional<MakeAttributes, "make_id"> {}

@Table({
  tableName: "makes",
  paranoid: true,
  timestamps: true,
})
export default class Make extends Model<
  MakeAttributes,
  MakeCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  make_id: string;

  @Column({
    unique: true,
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
