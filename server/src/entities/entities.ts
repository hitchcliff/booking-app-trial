import { MixedList } from "typeorm";
import User from "./User";
import Booking from "./Booking";

export const entities: MixedList<string | Function> = [
  User,
  Booking
];
