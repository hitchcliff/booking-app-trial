import { FirebaseStorage } from "@firebase/storage";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Field, InputType, ObjectType } from "type-graphql";
import User from "../entities/User";
import Booking from "../entities/Booking";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: number };
    sessionStore: any;
  };
  res: Response;
  storage: FirebaseStorage;
};

@ObjectType()
export class FieldError {
  @Field({ nullable: true })
  field?: string;

  @Field({ nullable: true })
  message?: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;

  @Field()
  dialCode: string;

  @Field()
  phoneNumber: string;

  @Field()
  accountType: string;

  @Field()
  acceptedTermsAndConditions: boolean;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
export class UpdateRoleInput {
  @Field()
  userId: string;

  @Field()
  role: string;
}

@InputType()
export class CreateBookingInput {
  @Field()
  title: string;

  @Field()
  body: string;
}

@ObjectType()
export class BookingResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Booking, { nullable: true })
  booking?: Booking;
}
