import { Application } from "express";
import { Server } from "http";

import logger from "./logger";
import expressLoader from "./express";
import socketLoader from "./socket";

import User from "../database/models/user.models";
import dependencyInjector from "./dependencyInjector";

export default async ({
  expressApp,
  httpServer,
}: {
  expressApp: Application;
  httpServer: Server;
}) => {
  //dependency injector
  dependencyInjector({
    models: [
      {
        model: User,
        name: "userModel",
      },
    ],
  });
  logger.info("dependency injector loaded");

  // express load
  expressLoader(expressApp);
  logger.info("express loaded");

  // socket load
  socketLoader(httpServer);
  logger.info("socket loaded");
};
