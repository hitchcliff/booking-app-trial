import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import Booking from "../entities/Booking";
import Like from "../entities/Like";
import getUser from "../helpers/get_user";
import getUserId from "../helpers/get_user_id";
import isAuth from "../middleware/is_auth";
import { FieldInput, FieldMessage, UserAccountType } from "../utils/enums";
import {
  LikeBookingInput,
  LikeResponse,
  ReadBookingInput,
} from "../utils/type";
import isAuthAdmin from "../middleware/is_auth_admin";
import User from "../entities/User";

@Resolver()
export default class LikeResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Like])
  async readAllLikes(): Promise<Like[]> {
    return await Like.find({
      relations: {
        user: true,
        booking: true,
      },
    });
  }

  @UseMiddleware(isAuth)
  @Mutation(() => LikeResponse)
  async likeBooking(
    @Arg(FieldInput.OPTIONS) options: LikeBookingInput
  ): Promise<LikeResponse> {
    // increment the bookingLikes
    const booking = await Booking.findOne({
      where: {
        id: options.bookingId,
      },
    });

    if (!booking) {
      throw FieldMessage.NOT_AVAILABLE;
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

    // if already liked and has a value
    if (isAlreadyLiked && isAlreadyLiked.value >= 1) {
      throw FieldMessage.DUPLICATE;
    }
    let like = new Like();

    // if already like and value is 0
    if (isAlreadyLiked && isAlreadyLiked.value <= 0) {
      isAlreadyLiked.value = 1;
      like = await isAlreadyLiked.save();
    } else {
      // if no like, create a new one
      like.value = 1;
      like.user = user;
      like.booking = booking;
      // saves the like
      like = await like.save();
    }

    const likes = booking.likes ?? 0;
    booking.likes = likes + 1;
    await booking.save();

    return {
      like,
    };
  }

  @UseMiddleware(isAuth)
  @Mutation(() => LikeResponse)
  async dislikeBooking(
    @Arg(FieldInput.OPTIONS) options: LikeBookingInput
  ): Promise<LikeResponse | boolean> {
    // increment the bookingLikes
    const booking = await Booking.findOne({
      where: {
        id: options.bookingId,
      },
    });

    if (!booking) {
      throw FieldMessage.NOT_AVAILABLE;
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

    if (isAlreadyLiked.value <= 0) {
      throw FieldMessage.NOT_AVAILABLE;
    }

    // remove the like so user can like again
    isAlreadyLiked.value = 0;
    const like = await isAlreadyLiked.save();

    const likes = booking.likes ?? 0;
    booking.likes = likes - 1;
    await booking.save();

    return {
      like,
    };
  }

  @UseMiddleware(isAuthAdmin)
  @Mutation(() => Boolean)
  async resetLikes(): Promise<boolean> {
    const likes = await Like.find({
      relations: {
        booking: true,
        user: true,
      },
    });

    likes.every(async (like) => {
      const booking = await Booking.findOne({
        where: {
          id: like.booking.id,
        },
      });

      booking!.likes = 0;
      booking!.userLikes = [];

      const user = await User.findOne({
        where: {
          id: like.user.id,
        },
      });
      user!.bookingLikes = [];

      await booking?.save();
      await user?.save();
      await like.remove();
    });

    return true;
  }
}
