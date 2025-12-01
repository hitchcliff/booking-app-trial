import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import Appointment from "../entities/Appointment";
import getUser from "../helpers/get_user";
import getUserId from "../helpers/get_user_id";
import { MyValidation } from "../helpers/validation";
import isAuth from "../middleware/is_auth";
import isAuthAdmin from "../middleware/is_auth_admin";
import { FieldInput, FieldMessage, UserAccountType } from "../utils/enums";
import { AppointmentResponse, CreateAppointmentInput } from "../utils/type";
import User from "../entities/User";

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
        id: userId, // save the whole User in Appointment
      },
      booking: {
        id: options.id, // save the whole Booking in Appointment
      },
    });

    return {
      appointment,
    };
  }

  @UseMiddleware(isAuthAdmin) // must be adming to read all appointments
  @Query(() => [Appointment])
  async readAllAppointments(): Promise<Appointment[]> {
    const userId = getUserId();

    return await Appointment.find({
      where: {
        booking: {
          user: {
            id: userId,
          },
        },
      },
    });
  }

  @UseMiddleware(isAuth)
  @Query(() => [Appointment], { nullable: true })
  async readAllMyAppointments(): Promise<Appointment[] | undefined> {
    const id = getUserId();

    const user = await User.findOne({
      where: { id: id },
      relations: {
        appointments: {
          booking: {
            user: true,
          },
        },
      },
    });

    return user?.appointments;
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

  /**
   * Delete the appointment of the user
   * @param id number
   * @returns boolean
   */
  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteAppointmentById(
    @Arg(FieldInput.ID) id: number
  ): Promise<boolean> {
    try {
      const appointment = await Appointment.findOne({
        where: { id },
      });

      if (!appointment) throw Error("no Appointment");

      // either the user/agent can delete appointment
      await appointment?.remove();
      return true;
    } catch (error) {
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
