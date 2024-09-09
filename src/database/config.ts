import { IDatabase } from "./db.interface";
import { SequelizeConfig } from "./sequelize.config";

export class DatabaseConfig {
  constructor(private databaseConfig: IDatabase) {}

  async dbInit() {
    await this.databaseConfig.dbInit();
  }
}

export const dbConfig = new DatabaseConfig(new SequelizeConfig());
