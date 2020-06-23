import express from "express";
import http from "http";

import dbConnection from "./database/connections";

import config from "./config";

import loader from "./loaders";

async function startServer() {
  const app: express.Application = express();
  const server = http.createServer(app);

  await dbConnection(true);

  loader({ expressApp: app, httpServer: server });

  server.listen(config.port, () => {
    console.log("server running");
  });
}

startServer();
