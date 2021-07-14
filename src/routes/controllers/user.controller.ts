import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";

import UserService from "../../service/user";
import { customThrowError, ErrorGenerator } from "../middlewares/error";
import JWTCheckMiddleware from "../middlewares/jwt/jwtCheck";

const router = Router();

router.get(
  "/",
  JWTCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userService = Container.get(UserService);

      const userData = res.locals.user;

      const user = await userService.getMyInfo({ id: userData.id });

      if (user === null) {
        throw customThrowError({ name: "UNAUTHORIZED" });
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            accountId: user.accountId,
            name: user.name,
            createdAt: user.createdAt,
          },
        },
      });
    } catch (error) {
      next(new ErrorGenerator({ error, errorName: "DATABASE_ERROR" }));
    }
  }
);

export default router;
