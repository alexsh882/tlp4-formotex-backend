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
import {
  IUserAttributes,
  IUserCreationAttributes,
} from "../features/users/interfaces/user";

@Table({
  tableName: "users",
  paranoid: true,
  timestamps: true,
})
export default class User extends Model<
  IUserAttributes,
  IUserCreationAttributes
> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  user_id: string;

  @Column({})
  names: string;

  @Column({
    unique: true,
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

  notification(message: string) {
    console.log(`Usuario ${this.names} notificado. Mensaje: ${message}`);
  }
}
