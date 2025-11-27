import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import Appointment from "../entities/Appointment";
import getUser from "../helpers/get_user";
import getUserId from "../helpers/get_user_id";
import { MyValidation } from "../helpers/validation";
import isAuth from "../middleware/is_auth";
import isAuthAdmin from "../middleware/is_auth_admin";
import { FieldInput, FieldMessage, UserAccountType } from "../utils/enums";
import { AppointmentResponse, CreateAppointmentInput } from "../utils/type";

@Resolver()
export default class AppointmentResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => AppointmentResponse)
  async createAppointment(
    @Arg(FieldInput.OPTIONS) options: CreateAppointmentInput
  ): Promise<AppointmentResponse> {
    // validate
    const errors = new MyValidation().validateAppointment(options);

    if (errors.length) {
      return {
        errors,
      };
    }

    // check for user if they are a booker
    const userId = getUserId(); // gets the user id
    const user = await getUser({ id: userId! });

    if (user?.accountType !== UserAccountType.BOOKER) {
      throw FieldMessage.NOT_BOOKER;
    }

    // check if user has already appointed the booking
    const isAlreadyAppointed = await Appointment.findOne({
      where: {
        user: {
          id: userId,
        },
        booking: {
          id: options.id,
        },
      },
    });

    if (isAlreadyAppointed) {
      throw FieldMessage.DUPLICATE;
    }

    // saves the booking
    const appointment = await Appointment.save({
      ...options,
      user: {
        id: userId,
      },
      booking: {
        id: options.id, // booking id
      },
    });

    return {
      appointment,
    };
  }

  @UseMiddleware(isAuthAdmin) // must be adming to read all appointments
  @Query(() => [Appointment])
  async readAllAppointments(): Promise<Appointment[]> {
    return await Appointment.find();
  }

  @UseMiddleware(isAuth)
  @Query(() => [Appointment], { nullable: true })
  async readAllMyAppointments(): Promise<Appointment[] | null> {
    const id = getUserId();

    return await Appointment.find({
      where: {
        user: {
          id,
        },
      },
    });
  }

  @UseMiddleware(isAuthAdmin) // they must be admin to read specific booking appointment
  @Query(() => [Appointment], { nullable: true })
  async readAppointmentsByBookingId(
    @Arg(FieldInput.ID) id: number
  ): Promise<Appointment[] | null> {
    return await Appointment.find({
      where: {
        booking: {
          id,
        },
      },
    });
  }

  @UseMiddleware(isAuthAdmin)
  @Mutation(() => Boolean)
  async deleteAppointmentById(
    @Arg(FieldInput.ID) id: number
  ): Promise<boolean> {
    try {
      const booking = await Appointment.findOne({
        where: { id },
      });

      if (!Appointment) throw Error("no Appointment");

      await booking?.remove();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @UseMiddleware(isAuthAdmin)
  @Mutation(() => Boolean)
  async deleteAllAppointments() {
    try {
      const appointments = await Appointment.find();

      if (!appointments.length) throw Error("No Appointments");

      appointments.every((appointment) => appointment.remove());
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
