import { Sequelize } from "sequelize-typescript";
import { dbConfig } from "./config";
import { IDatabase } from "./db.interface";
import { Dialect } from "sequelize";
import User from "../models/users.model";
import Role from "../models/role.model";
import { seedRoles } from "./seeders/roles.seeder";
import EquipmentType from "../models/equipment-type.model";
import { seedUserAdmin } from "./seeders/user.seeder";

export class SequelizeConfig implements IDatabase {
  private DB_HOST: string;
  private DB_PORT: string | number;
  private DB_NAME: string;
  private DB_DIALECT: string | undefined;
  private DB_USER: string;
  private DB_PASSWORD: string;

  // singleton para obtener la instancia de la clase
  private static instance: SequelizeConfig;

  static getInstance(): SequelizeConfig {
    if (!this.instance) {
      this.instance = new SequelizeConfig();
    }
    return this.instance;
  }

  // probar la existencia de variable de entorno
  verifyEnvVar(envVar: string): string {
    //verificar que la variable de entorno está definida

    const envVarExists = Object.keys(process.env).indexOf(envVar) !== -1;

    if (!envVarExists) {
      throw new Error(`La variable de entorno ${envVar} no está definida.`);
    }
    return process.env[envVar] as string;
  }

  constructor() {
    this.DB_HOST = this.verifyEnvVar("DB_HOST") || "localhost";
    this.DB_PORT = this.verifyEnvVar("DB_PORT") || 5432;
    this.DB_NAME = this.verifyEnvVar("DB_NAME") || "test";
    this.DB_DIALECT = this.verifyEnvVar("DB_DIALECT") || "postgres";
    this.DB_USER = this.verifyEnvVar("DB_USER") || "test";
    this.DB_PASSWORD = this.verifyEnvVar("DB_PASSWORD") || "test";
  }

  // inicializar la base de datos
  async dbInit() {
    const db = this.getDbConfig();

    db.addModels([__dirname + "/../models/*.model.*"]);

    await db
      .sync({ force: true })
      .then(async () => {
        await seedRoles();
        await seedUserAdmin();
        console.log("La base de datos se ha conectado correctamente.");
      })
      .catch((err: Error) => {
        console.error(
          "No se puede conectar a la base de datos por el error: ",
          err
        );
      });
  }

  // obtener instancia de sequelize con la configuración de la base de datos
  getDbConfig(): Sequelize {
    return new Sequelize({
      database: this.DB_NAME,
      dialect: this.DB_DIALECT as Dialect,
      host: this.DB_HOST,
      port: Number(this.DB_PORT),
      username: this.DB_USER,
      password: this.DB_PASSWORD,
    });
  }
}
