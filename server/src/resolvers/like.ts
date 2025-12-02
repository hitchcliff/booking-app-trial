import { Arg, Mutation, Resolver, UseMiddleware } from "type-graphql";
import Like from "../entities/Like";
import getUser from "../helpers/get_user";
import getUserId from "../helpers/get_user_id";
import { MyValidation } from "../helpers/validation";
import isAuth from "../middleware/is_auth";
import { FieldInput, FieldMessage, UserAccountType } from "../utils/enums";
import { LikeBookingInput, LikeResponse } from "../utils/type";

@Resolver()
export default class LikeResolver {
  @UseMiddleware(isAuth)
  @Mutation(() => LikeResponse)
  async likeBooking(
    @Arg(FieldInput.OPTIONS) options: LikeBookingInput
  ): Promise<LikeResponse> {
    // validate
    const errors = new MyValidation().validateLike(options);

    if (errors.length) {
      return {
        errors,
      };
    }

    // check for user if they are a booker
    const userId = getUserId(); // gets the user id
    const user = await getUser({ id: userId! });

    // only bookers can like
    if (user?.accountType !== UserAccountType.BOOKER) {
      throw FieldMessage.NOT_BOOKER;
    }

    // check if user has already appointed the booking
    const isAlreadyLiked = await Like.findOne({
      where: {
        user: {
          id: userId,
        },
        booking: {
          id: options.bookingId,
        },
      },
    });

    if (isAlreadyLiked) {
      throw FieldMessage.DUPLICATE;
    }

    // saves the like
    const like = await Like.save({
      ...options,
      user: {
        id: userId, // save the whole User in Appointment
      },
      booking: {
        id: options.bookingId, // save the whole Booking in Appointment
      },
    });

    return {
      like,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => LikeResponse)
  async dislikeBooking(
    @Arg(FieldInput.OPTIONS) options: LikeBookingInput
  ): Promise<LikeResponse> {
    // validate
    const errors = new MyValidation().validateDislike(options);

    if (errors.length) {
      return {
        errors,
      };
    }

    // check for user if they are a booker
    const userId = getUserId(); // gets the user id
    const user = await getUser({ id: userId! });

    // only bookers can like
    if (user?.accountType !== UserAccountType.BOOKER) {
      throw FieldMessage.NOT_BOOKER;
    }

    // check if user has already appointed the booking
    const isAlreadyLiked = await Like.findOne({
      where: {
        user: {
          id: userId,
        },
        booking: {
          id: options.bookingId,
        },
      },
    });

    if (!isAlreadyLiked) {
      throw FieldMessage.NOT_AVAILABLE;
    }

    isAlreadyLiked.value = 0;
    const like = await isAlreadyLiked.save();

    return {
      like,
    };
  }
}
