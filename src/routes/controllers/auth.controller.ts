import { Router, Request, Response, NextFunction } from "express";
import { Container } from "typedi";

import AuthService from "../../service/auth";
import { ErrorGenerator } from "../middlewares/error";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { accountId, password, name } = req.body;

  try {
    const authService = Container.get(AuthService);

    const { user, token } = await authService.Register({
      accountId,
      password,
      name,
    });

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          accountId: user.accountId,
          name: user.name,
          createdAt: user.createdAt,
        },
        token: token.accessToken,
      },
    });
  } catch (error) {
    next(new ErrorGenerator({ error, errorName: "DATABASE_ERROR" }));
  }
});

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { accountId, password } = req.body;
    try {
      const authService = Container.get(AuthService);

      const { user, token } = await authService.Login({ accountId, password });

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
      });

      res.json({
        success: true,
        user,
        token: token.accessToken,
      });
    } catch (error) {
      next(new ErrorGenerator({ error, errorName: "DATABASE_ERROR" }));
    }
  }
);

export default router;
