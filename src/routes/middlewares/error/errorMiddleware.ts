import { Request, Response, NextFunction } from "express";
import logger from "../../../loaders/logger";

import { IError, CustomErrors } from "./errorTypes";

const customErrorMiddleware = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error.stack);

  res.status(error.code).json({
    success: false,
    error: {
      name: error.name,
      message: error.message,
      code: error.code
    }
  });
};

export default customErrorMiddleware;
