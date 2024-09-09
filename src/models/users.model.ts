import { Table, Column, Model, BelongsTo, ForeignKey, CreatedAt, UpdatedAt, DeletedAt } from "sequelize-typescript";
import Role from "./role.model";
import { Optional } from "sequelize";

interface UserAttributes {
  user_id: number;
  names: string;
  username: string;
  password: string;
  role_id: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}

@Table({
  tableName: "users",
  paranoid: true,
  timestamps: true,
})
export default class User extends Model<UserAttributes, UserCreationAttributes> {
  
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  user_id: number;

  @Column({})
  names: string;

  @Column({})
  username: string;

  @Column({})
  password: string;

  @ForeignKey(() => Role)
  role_id: number;

  @BelongsTo(() => Role)
  user_role: Role;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}