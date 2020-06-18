import { Request, Response, NextFunction } from "express";

const Register = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      what: "register",
    });
  } catch (err) {
    console.log(err);
  }
};

export default Register;
