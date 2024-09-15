import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Default,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";
import Role from "./role.model";
import { Optional } from "sequelize";

interface UserAttributes {
  user_id: string;
  names: string;
  username: string;
  password: string;
  role_id: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "user_id" | "role_id"> {}

@Table({
  tableName: "users",
  paranoid: true,
  timestamps: true,
})
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  user_id: string;

  @Column({})
  names: string;

  @Column({
    unique: true
  })
  username: string;

  @Column({})
  password: string;

  @ForeignKey(() => Role)
  role_id: string;

  @BelongsTo(() => Role)
  user_role: Role;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
