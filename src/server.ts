import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

export class Server {
  private app: Application;
  private app_port: string | number;
  private app_host: string;

  //lista de promesas
  private beforeStart: (() => Promise<void>)[];

  constructor() {
    this.app = express();
    this.app_port = process.env.APP_PORT || 3000;
    this.app_host = process.env.APP_HOST || "localhost";
    this.beforeStart = [];

    this.middleware();
    this.routes();
  }

  public middleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
  }

  public routes(): void {
  }

  onBeforeStart(callback: () => Promise<void>): void {
    this.beforeStart?.push(callback);
  }

  public async start(): Promise<void> {
    for (const callback of this.beforeStart) {
      await callback();
    }

    this.app.listen(this.app_port, () => {
      console.log(
        `Server corriendo en http://${this.app_host}:${this.app_port}`
      );
    });
  }
}
