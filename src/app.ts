import { Server } from "./server";
import { dbConfig } from "./database/config";


const server = new Server();

server.onBeforeStart(async () => {
  await dbConfig.dbInit();
});


server.start();