import sequelize, { Dialect } from "sequelize";


export class DatabaseConfig {
  private DB_HOST: string;
  private DB_PORT: string | number;
  private DB_NAME: string;
  private DB_DIALECT: string | undefined;
  private DB_USER: string;
  private DB_PASSWORD: string;

  constructor() {
    this.DB_HOST = process.env.DB_HOST || "localhost";
    this.DB_PORT = process.env.DB_PORT || 5432;
    this.DB_NAME = process.env.DB_NAME || "test";
    this.DB_DIALECT = process.env.DB_DIALECT || "postgres";
    this.DB_USER = process.env.DB_USER || "test";
    this.DB_PASSWORD = process.env.DB_PASSWORD || "test";
  }

  async dbInit() {
    const db = new sequelize.Sequelize(this.DB_NAME, this.DB_USER, this.DB_PASSWORD, {
      host: this.DB_HOST,
      port: this.DB_PORT as number,
      dialect: this.DB_DIALECT as Dialect,
    });

    await db.sync()
      .then(() => {
        console.log("La base de datos se ha conectado correctamente.");
      })
      .catch((err: Error) => {
        console.error("No se puede conectar a la base de datos por el error: ", err);
      });
  }

  public get host(): string {
    return this.DB_HOST;
  }

  public get port(): string | number {
    return this.DB_PORT;
  }

  public get name(): string {
    return this.DB_NAME;
  }

  public get user(): string {
    return this.DB_USER;
  }

  public get password(): string {
    return this.DB_PASSWORD;
  }
}

export const dbConfig = new DatabaseConfig();
