import { Optional } from "sequelize";

export interface IMakeAttributes {
  make_id: string;
  name: string;
}

export interface IMakeCreationAttributes
  extends Optional<IMakeAttributes, "make_id"> {}

export interface IMakeUpdateAttributes
  extends Partial<IMakeCreationAttributes> {}
