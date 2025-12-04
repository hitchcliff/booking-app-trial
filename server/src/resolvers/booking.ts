import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import Booking from "../entities/Booking";
import getUserId from "../helpers/get_user_id";
import { MyValidation } from "../helpers/validation";
import isAuthAdmin from "../middleware/is_auth_admin";
import { FieldInput } from "../utils/enums";
import {
  BookingResponse,
  CreateBookingInput,
  ReadBookingInput,
} from "../utils/type";
import getUser from "../helpers/get_user";
import Appointment from "../entities/Appointment";
import Search from "../helpers/search";
import Like from "../entities/Like";

@Resolver()
export default class BookingResolver {
  @UseMiddleware(isAuthAdmin)
  @Mutation(() => BookingResponse)
  async createBooking(
    @Arg(FieldInput.OPTIONS) options: CreateBookingInput
  ): Promise<BookingResponse> {
    const userId = getUserId(); // gets the user id
    const user = await getUser({ id: userId! });

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
        ...user,
      },
    });

    return {
      booking,
    };
  }

  @Query(() => [Booking])
  async readBookingTrending(): Promise<Booking[]> {
    const bookings = await Booking.find({
      take: 50,
    });

    let trends: Booking[] = Array.from({ length: 5 }, (_, i) => bookings[i]);
    bookings.forEach((booking) => {
      if (!trends.length) {
        trends.push(booking);
      } else {
        trends.forEach((trend, idx) => {
          if (trend.likes! <= booking.likes!) {
            trends[idx] = booking;
          }
        });
      }
    });

    return trends;
  }

  @Query(() => [Booking])
  async readAllBookings(
    @Arg(FieldInput.OPTIONS) options: ReadBookingInput
  ): Promise<Booking[]> {
    if (options.search?.length) {
      const search = new Search().byText(
        options.search,
        await Booking.find({
          order: {
            id: "DESC",
          },
          relations: {
            user: true,
            appointments: true,
            userLikes: true,
          },
        })
      );

      // console.log(search);
      return search;
    }

    const bookings = await Booking.find({
      take: options.take,
      skip: options.skip,
      order: {
        id: "DESC",
      },
      relations: {
        user: true,
        appointments: true,
        userLikes: true,
      },
    });

    return bookings;
  }

  @Query(() => Booking, { nullable: true })
  async readBookingById(
    @Arg(FieldInput.ID) id: number
  ): Promise<Booking | null> {
    return await Booking.findOne({
      where: {
        id: id,
      },
      relations: {
        appointments: {
          user: true,
        },
      },
    });
  }

  @UseMiddleware(isAuthAdmin) // or could be just agent
  @Mutation(() => Boolean)
  async deleteBookingById(@Arg(FieldInput.ID) id: number): Promise<boolean> {
    try {
      const userId = getUserId();
      const booking = await Booking.findOne({
        where: {
          id,
          user: {
            id: userId,
          },
        },
        relations: {
          userLikes: true,
          appointments: true,
          user: true,
        },
      }); // that owns the booking

      if (!booking) throw Error("no Booking");

      // find also appointments that has booking
      const appoinments = await Appointment.find({
        where: {
          booking: {
            id,
          },
        },
      });

      if (appoinments.length) {
        // remove appointments
        appoinments.every((appointment) => {
          appointment.remove();
        });
      }

      // delete also the likes to fix error of PK_
      const like = await Like.findOne({
        where: {
          booking: {
            id: id,
          },
        },
      });

      await like?.remove();

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
