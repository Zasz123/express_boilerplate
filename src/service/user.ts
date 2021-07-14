import { Service, Inject } from "typedi";
import { WhereOptions } from "sequelize";
import User from "../database/models/user.models";
import { IUserMyInfo } from "../interfaces/member";

@Service()
export default class UserService {
  @Inject("userModel")
  user!: typeof User;

  public async getMyInfo({ id, accountId }: IUserMyInfo) {
    try {
      const where: WhereOptions = {};

      if (id !== undefined) {
        where.id = id;
      }

      if (accountId !== undefined) {
        where.accountId = accountId;
      }

      const user = await this.user.findOne({
        where,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
