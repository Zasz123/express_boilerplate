import { Router, Request, Response, NextFunction } from "express";

const router = Router();

import Register from "../middlewares/user/register";

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    hello: "eqw",
  });
});

router.post("/register", Register);

export default router;
