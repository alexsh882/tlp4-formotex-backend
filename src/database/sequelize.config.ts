import { Dialect, Sequelize } from "sequelize";
import { IDatabase } from "./db.interface";


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
    if (!SequelizeConfig.instance) {
      SequelizeConfig.instance = new SequelizeConfig();
    }
    return SequelizeConfig.instance;
  }

  // probar la existencia de variable de entorno
  verifyEnvVar(envVar: string): string {
    if (!process.env[envVar]) {
      throw new Error(`La variable de entorno ${envVar} no está definida.`);
    }
    return process.env[envVar] as string;
  }

  constructor() {
    this.DB_HOST = this.verifyEnvVar('DB_HOST') || "localhost";
    this.DB_PORT = process.env.DB_PORT || 5432;
    this.DB_NAME = process.env.DB_NAME || "test";
    this.DB_DIALECT = process.env.DB_DIALECT || "postgres";
    this.DB_USER = process.env.DB_USER || "test";
    this.DB_PASSWORD = process.env.DB_PASSWORD || "test";
  }

  async dbInit() {    

    const db = this.getDbConfig();

    await db.sync()
      .then(() => {
        console.log("La base de datos se ha conectado correctamente.");
      })
      .catch((err: Error) => {
        console.error("No se puede conectar a la base de datos por el error: ", err);
      });
  }

  getDbConfig(): Sequelize {
    return new Sequelize(this.DB_NAME, this.DB_USER, this.DB_PASSWORD, {
      host: this.DB_HOST,
      port: this.DB_PORT as number,
      dialect: this.DB_DIALECT as Dialect,
    });
  }
}

export const dbConfig = SequelizeConfig.getInstance();
export const sequelize = dbConfig.getDbConfig();