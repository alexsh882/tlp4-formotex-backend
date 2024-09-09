import { Table, Column, Model, HasMany, CreatedAt, DeletedAt, UpdatedAt } from "sequelize-typescript";

import { Optional } from "sequelize";
import User from "./users.model";

interface RoleAttributes {
  role_id: number;
  name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'role_id'> {}


@Table({
  tableName: "roles",
  paranoid: true,
  timestamps: true
})
export default class Role extends Model<RoleAttributes, RoleCreationAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  role_id: number;

  @Column({
    unique: true
  })
  name: string;

  @HasMany(() => User)
  users: User[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
