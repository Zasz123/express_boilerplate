import { Request, Response, NextFunction } from "express";
import { Container } from "typedi";
import { customThrowError, ErrorGenerator } from "../error";
import UserService from "../../../service/user";
import AuthService from "../../../service/auth";

const JWTCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  try {
    if (token === undefined) {
      throw customThrowError({
        name: "UNAUTHORIZED",
        message: "token not found.",
      });
    }

    const dividedToken = token.split(" ");

    const tokenType = dividedToken[0];
    const tokenString = dividedToken[1];

    if (tokenType !== "Bearer") {
      throw customThrowError({
        name: "UNAUTHORIZED",
        message: "invalid token type",
      });
    }

    const authService = Container.get(AuthService);

    const user = await authService.VerifyJWTAndFindUser(tokenString);

    if (user === null) {
      throw customThrowError({
        name: "UNAUTHORIZED",
        message: "invalid token.",
      });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    next(new ErrorGenerator({ error, errorName: "UNAUTHORIZED" }));
  }
};

export default JWTCheckMiddleware;
