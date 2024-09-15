import { Table, Column, Model, HasMany, CreatedAt, DeletedAt, UpdatedAt, PrimaryKey, Default, DataType } from "sequelize-typescript";

import User from "./users.model";
import { IRoleAttributes, IRoleCreationAttributes } from "../features/roles/interfaces/role";




@Table({
  tableName: "roles",
  paranoid: true,
  timestamps: true
})
export default class Role extends Model<IRoleAttributes, IRoleCreationAttributes> {
  
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  role_id: string;

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
