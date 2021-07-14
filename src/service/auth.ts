import { Service, Inject, Container } from "typedi";
import User from "../database/models/user.models";
import { ILoginProps, IRegisterProps } from "../interfaces/auth";
import bcrypt from "bcrypt";
import { generateJWT, verifyToken } from "../utils/jwt";
import { customThrowError } from "../routes/middlewares/error";
import UserService from "./user";

@Service()
export default class AuthService {
  @Inject("userModel")
  user!: typeof User;

  constructor() {}

  public async Register({ accountId, password, name }: IRegisterProps) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.user.create({
        accountId,
        password: hashedPassword,
        name,
      });

      const token = generateJWT({ id: createdUser.id });

      return {
        user: createdUser,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  public async Login({ accountId, password }: ILoginProps) {
    try {
      const registerdUser: User | null = await this.user.findOne({
        where: { accountId },
      });

      if (registerdUser === null) {
        throw customThrowError({
          name: "UNAUTHORIZED",
          message: "user not found. please retry",
        });
      }

      const isMatched = await bcrypt.compare(registerdUser.password, password);

      if (!isMatched) {
        throw customThrowError({
          name: "UNAUTHORIZED",
          message: "invalid password.",
        });
      }

      const token = generateJWT({ id: registerdUser.id });

      return {
        user: {
          id: registerdUser.id,
          accountId: registerdUser.accountId,
          name: registerdUser.name,
          createdAt: registerdUser.createdAt,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  public async VerifyJWTAndFindUser(token: string) {
    try {
      const { id } = verifyToken(token);

      const userService = Container.get(UserService);

      const user: User | null = await userService.getMyInfo({ id });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
