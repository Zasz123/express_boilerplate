import jwt from "jsonwebtoken";
import config from "../config";
import logger from "../loaders/logger";
import { ITokenPayload } from "../interfaces/auth";

export const generateJWT = (payload: ITokenPayload) => {
  try {
    const accessToken: string = jwt.sign(
      {
        id: payload.id,
      },
      config.jwtSecret,
      {
        expiresIn: "5h",
      }
    );

    const refreshToken: string = jwt.sign(
      {
        id: payload.id,
      },
      config.jwtSecret,
      {
        expiresIn: "7d",
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export const verifyToken = (token: string) => {
  try {
    const verifedData = jwt.verify(token, config.jwtSecret);

    return verifedData as ITokenPayload;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};
