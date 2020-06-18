import express from "express";
import morgan from "morgan";

import rootController from "../routes/controllers/rootController";

export default (app: express.Application) => {
  app.use(morgan("dev"));
  app.use(rootController);
};
