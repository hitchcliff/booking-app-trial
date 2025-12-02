import { NonEmptyArray } from "type-graphql";

import UserResolver from "./user";
import BookingResolver from "./booking";
import AppointmentResolver from "./appointment";
import LikeResolver from "./like";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  BookingResolver,
  AppointmentResolver,
  LikeResolver,
];
