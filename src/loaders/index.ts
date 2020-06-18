import { Application } from "express";
import { Server } from "http";

import expressLoader from "./express";
import socketLoader from "./socket";

export default ({
  expressApp,
  httpServer,
}: {
  expressApp: Application;
  httpServer: Server;
}) => {
  //express load
  expressLoader(expressApp);
  //socket load
  const io = socketLoader(httpServer);

  io.on("connection", () => {
    console.log("asd");
  });
};
