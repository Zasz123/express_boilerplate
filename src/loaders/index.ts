import { Application } from "express";
import { Server } from "http";

import loggerLoader from "./logger";
import expressLoader from "./express";
import socketLoader from "./socket";

export default async ({
  expressApp,
  httpServer,
}: {
  expressApp: Application;
  httpServer: Server;
}) => {
  // logger by winston load
  loggerLoader;

  //express load
  expressLoader(expressApp);

  //socket load
  socketLoader(httpServer);
};
