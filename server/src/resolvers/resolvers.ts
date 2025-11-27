import { NonEmptyArray } from "type-graphql";

import UserResolver from "./user";
import BookingResolver from "./booking";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  BookingResolver
];
