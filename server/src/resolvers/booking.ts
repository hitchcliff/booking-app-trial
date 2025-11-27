import Booking from "../entities/Booking";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export default class BookingResolver {
  @Mutation(() => Booking)
  async createBooking(@Arg("body") body: string): Promise<Booking> {
    return await Booking.save({
      body,
    });
  }

  @Query(() => [Booking])
  async readBookings(): Promise<Booking[]> {
    return await Booking.find();
  }

  @Query(() => Booking, { nullable: true })
  async readBookingById(@Arg("id") id: number): Promise<Booking | null> {
    return await Booking.findOne({
      where: {
        id: id,
      },
    });
  }

  @Mutation(() => Boolean)
  async deleteBookingById(@Arg("id") id: number): Promise<boolean> {
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

  @Mutation(() => Boolean)
  async deleteBookings() {
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

