import { Optional } from "sequelize";

export interface IRoleAttributes {
  role_id: string;
  name: string;
}

export interface IRoleCreationAttributes
  extends Optional<IRoleAttributes, "role_id"> {}

export interface IRoleUpdateAttributes
  extends Partial<IRoleCreationAttributes> {}
