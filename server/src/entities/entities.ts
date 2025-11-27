import { MixedList } from "typeorm";
import User from "./User";
import Booking from "./Booking";
import Appointment from "./Appointment";

export const entities: MixedList<string | Function> = [
  User,
  Booking,
  Appointment,
];
