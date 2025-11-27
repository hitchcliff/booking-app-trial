import { UserCredential } from "@firebase/auth";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import User from "../entities/User";
import FirebaseAuthException from "../exceptions/firebase_auth_exceptions";
import getUserId from "../helpers/get_user_id";
import isAuth from "../middleware/is_auth";
import AuthRepository from "../repository/auth_repository";
import {
  FieldError,
  LoginInput,
  RegisterInput,
  UpdateRoleInput,
  UserResponse,
} from "../utils/type";
import { MyValidation } from "../helpers/validation";
import isAuthAdmin from "../middleware/is_auth_admin";

@Resolver()
export default class UserResolver {
  private authRepository = new AuthRepository();
  private firebaseAuthException = new FirebaseAuthException();

  /**
   * Register a User
   * @param options RegisterInput
   * @returns UserResponse
   */
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput
  ): Promise<UserResponse> {
    try {
      const errors = new MyValidation().validateRegister(options);

      if (errors.length) {
        return {
          errors,
        };
      }

      // register in firebase

      // check for email if already exists
      const emailExists = await User.findOne({
        where: {
          email: options.email,
        },
      });

      if (emailExists) {
        errors.push({
          field: "email",
          message: "email already exists",
        });

        return { errors };
      }

      // Register to firebase
      const registeredEmail: UserCredential =
        await this.authRepository.registerWithEmailAndPassword({
          email: options.email,
          password: options.password,
        });

      const user = await User.save({
        ...options,
        id: registeredEmail.user.uid,
        emailVerified: registeredEmail.user.emailVerified,
        email: registeredEmail.user.email!,
      });

      return {
        user,
      };
    } catch (errors) {
      const firebaseError: FieldError[] = [];

      if (!!errors.code) {
        firebaseError.push({
          field: "exception",
          message: this.firebaseAuthException.message(errors.code),
        });
      }

      return {
        errors: firebaseError,
      };
    }
  }

  /**
   *  Login a User
   * @param options LoginInput
   * @returns UserResponse
   */
  @Mutation(() => UserResponse)
  async login(@Arg("options") options: LoginInput): Promise<UserResponse> {
    try {
      const user = await User.findOne({
        where: {
          email: options.email,
        },
      });

      if (!user) {
        return {
          errors: [
            {
              field: "email",
              message: "email doesn't exists",
            },
          ],
        };
      }

      await this.authRepository.loginWithEmailAndPassword({
        email: options.email,
        password: options.password,
      });

      return {
        user,
      };
    } catch (errors) {
      let firebaseError;

      if (!!errors.code) {
        firebaseError = this.firebaseAuthException.message(errors.code);
      }

      return {
        errors: [
          {
            field: "exception",
            message: firebaseError,
          },
        ],
      };
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async logout(): Promise<boolean> {
    try {
      await this.authRepository.logout();
      return true;
    } catch (error) {
      return false;
    }
  }

  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me(): Promise<User | null> {
    try {
      const userId = getUserId();

      if (!userId) return null;

      const user = await User.findOne({
        where: { id: userId },
      });

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  @UseMiddleware(isAuthAdmin)
  @Mutation(() => UserResponse)
  async updateRole(
    @Arg("options") options: UpdateRoleInput
  ): Promise<UserResponse> {
    try {
      const user = await User.findOne({
        where: {
          id: options.userId,
        },
      });

      if (!user) {
        return {
          errors: [
            {
              field: "update_role",
              message: "cant find user by ID",
            },
          ],
        };
      }

      // update the role
      user.role = options.role;
      user.save();

      return {
        user,
      };
    } catch (error) {
      return error;
    }
  }
}
