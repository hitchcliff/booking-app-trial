import { NextFn } from "type-graphql";
import User from "../entities/User";
import { UserRole } from "../utils/enums";
import getUserId from "../helpers/get_user_id";
import AuthRepository from "../repository/auth_repository";

/**
 * Middleware for checking user if Logged in as Role Admin
 * @param param0
 * @param next
 * @returns
 */
const isAuthAdmin = async ({}: Object, next: NextFn): Promise<boolean> => {
  const authRepository: AuthRepository = new AuthRepository();

  // logged in
  const userId = getUserId()!;

  if (authRepository.auth.currentUser === null && !userId) {
    throw new Error("not authenticated");
  }

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (user?.role !== UserRole.ADMIN) {
    throw new Error("not admin account");
  }

  return next();
};

export default isAuthAdmin;
