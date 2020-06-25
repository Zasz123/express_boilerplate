import { Request, Response, NextFunction } from "express";

import logger from "../../../../loaders/logger";
import { UserRegister } from "../../../../service/user";

const Register = async (req: Request, res: Response, next: NextFunction) => {
  const { accountId, password, name } = req.body;
  try {
    await UserRegister({
      accountId,
      password,
      name,
    });

    res.json({
      what: "register",
    });
  } catch (err) {
    logger.error(err.message);
  }
};

export default Register;
