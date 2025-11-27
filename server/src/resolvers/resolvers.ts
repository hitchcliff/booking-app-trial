import { NonEmptyArray } from "type-graphql";

import UserResolver from "./user";
import BookingResolver from "./booking";
import AppointmentResolver from "./appointment";

export const resolvers: NonEmptyArray<Function> = [
  UserResolver,
  BookingResolver,
  AppointmentResolver,
];
