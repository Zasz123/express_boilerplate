import express from "express";
import morgan from "morgan";

import rootController from "../routes/controllers/rootController";
import { customErrorMiddleware } from "../routes/middlewares/error";

export default (app: express.Application) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(rootController);

  app.use(customErrorMiddleware);
};
