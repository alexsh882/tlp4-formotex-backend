import { Optional } from "sequelize";

export interface IUserAttributes {
  user_id: string;
  names: string;
  username: string;
  password: string;
  role_id: string;
}

export interface IUserCreationAttributes
  extends Optional<IUserAttributes, "user_id" | "role_id"> {}

export interface IUserUpdateAttributes
  extends Partial<IUserCreationAttributes> {
    role_name: string
  }
