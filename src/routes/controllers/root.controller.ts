import { Router } from "express";

import AuthController from "./auth.controller";
import UserController from "./user.controller";

const router = Router();

router.use("/auth", AuthController);
router.use("/user", UserController);

export default router;
