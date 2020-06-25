import { IUserRegister } from "../../interfaces/User";
import User from "../../database/models/user.models";
import logger from "../../loaders/logger";

const UserRegister = async (user: IUserRegister) => {
  try {
    const createduser = await User.create(user);

    if (!createduser) {
      throw new Error("User Not Registered");
    }

    return {
      createduser,
    };
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

export default UserRegister;
