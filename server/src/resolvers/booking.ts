import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import Booking from "../entities/Booking";
import getUserId from "../helpers/get_user_id";
import { MyValidation } from "../helpers/validation";
import isAuthAdmin from "../middleware/is_auth_admin";
import { FieldInput } from "../utils/enums";
import { BookingResponse, CreateBookingInput } from "../utils/type";

@Resolver()
export default class BookingResolver {
  @UseMiddleware(isAuthAdmin)
  @Mutation(() => BookingResponse)
  async createBooking(
    @Arg(FieldInput.OPTIONS) options: CreateBookingInput
  ): Promise<BookingResponse> {
    const userId = getUserId(); // gets the user id

    // validate
    const errors = new MyValidation().validateBooking(options);
    console.log(errors);

    if (errors.length) {
      return {
        errors,
      };
    }

    // saves the booking
    const booking = await Booking.save({
      ...options,
      user: {
        id: userId,
      },
    });

    return {
      booking,
    };
  }

  @Query(() => [Booking])
  async readAllBookings(): Promise<Booking[]> {
    return await Booking.find();
  }

  @Query(() => Booking, { nullable: true })
  async readBookingById(
    @Arg(FieldInput.ID) id: number
  ): Promise<Booking | null> {
    return await Booking.findOne({
      where: {
        id: id,
      },
    });
  }

  @UseMiddleware(isAuthAdmin)
  @Mutation(() => Boolean)
  async deleteBookingById(@Arg(FieldInput.ID) id: number): Promise<boolean> {
    try {
      const booking = await Booking.findOne({
        where: { id },
      });

      if (!Booking) throw Error("no Booking");

      await booking?.remove();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @UseMiddleware(isAuthAdmin)
  @Mutation(() => Boolean)
  async deleteAllBookings() {
    try {
      const Bookings = await Booking.find();

      if (!Bookings.length) throw Error("No Bookings");

      Bookings.every((Booking) => Booking.remove());
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
