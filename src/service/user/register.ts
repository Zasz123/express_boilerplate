import { IUserRegister } from "../../interfaces/User";
import User from "../../database/models/user.models";
import logger from "../../loaders/logger";

const UserRegister = async (user: IUserRegister) => {
  try {
    const createdUser = await User.create(user);

    if (!createdUser) {
      throw new Error("Register Error");
    }

    return {
      createdUser,
    };
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export default UserRegister;
