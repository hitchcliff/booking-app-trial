import { MyContext } from "src/utils/type";
import { MiddlewareFn } from "type-graphql";
import AuthRepository from "../repository/auth_repository";

/**
 * Middleware for checking user if Logged in
 * @param param0
 * @param next
 * @returns
 */
const isAuth: MiddlewareFn<MyContext> = async ({}, next): Promise<boolean> => {
  const authRepository: AuthRepository = new AuthRepository();

  if (authRepository.auth.currentUser === null) {
    throw new Error("not authenticated");
  }

  return next();
};

export default isAuth;
