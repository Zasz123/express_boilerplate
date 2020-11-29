import { Router, Request, Response, NextFunction } from "express";
import { Router } from "express";

const router = Router();

import Register from "../middlewares/user/register";
import Login from "../middlewares/user/login";

router.post("/register", Register);
router.post("/login", Login);

export default router;
