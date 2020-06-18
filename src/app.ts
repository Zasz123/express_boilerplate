import express from "express";
import http from "http";

import config from "./config";

import loader from "./loaders";

function startServer() {
  const app: express.Application = express();
  const server = http.createServer(app);

  loader({ expressApp: app, httpServer: server });

  server.listen(config.port, () => {
    console.log("server running");
  });
}

startServer();
