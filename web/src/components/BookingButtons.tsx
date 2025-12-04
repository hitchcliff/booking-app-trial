import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  Booking,
  Maybe,
  useDislikeBookingMutation,
  useLikeBookingMutation,
  useMeQuery,
} from "../gen/graphql";
import { useAuthService } from "../hooks";
import useGlobalService from "../hooks/useGlobalService";
import { useGlobalSelector } from "../redux/features/global.selector";
import RoutePattern from "../routes/RoutePattern";
import { UserAccountType } from "../utils/enums";

interface BookingButtons {
  booking?: Maybe<Booking>;
  showCommentButton?: boolean;
  showViewDetailButton?: boolean;
}

export default function BookingButtons({
  showCommentButton = true,
  booking,
  showViewDetailButton = true,
}: BookingButtons) {
  const { setToggleComments } = useGlobalService();
  const { toggleComments } = useGlobalSelector();
  const [{ data }] = useMeQuery();
  const router = useRouter();
  const [, likeBooking] = useLikeBookingMutation();
  const [, dislikeBooking] = useDislikeBookingMutation();
  const [{ user: me }] = useAuthService();

  return (
    <div className="mt-5 flex flex-row">
      {/* {data!.me?.id !== booking?.user?.id && (
        <ButtonSecondary className="mr-5 btn-primary">
          <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
          Set appointment
        </ButtonSecondary>
      )} */}

      {showCommentButton && (
        <button
          onClick={() => setToggleComments(!toggleComments)}
          className="mr-5"
        >
          <FontAwesomeIcon className="mr-2" icon={faComment} />
          Write a comment
        </button>
      )}

      {showViewDetailButton && (
        <button
          onClick={() => {
            router.push(RoutePattern.BOOKING + "/" + booking?.id);
          }}
          className="italic text-blue-500"
        >
          View detail
        </button>
      )}

      {/* Like button, they must be booker to like this */}
      {me?.accountType === UserAccountType.BOOKER && (
        <button
          className="ml-auto"
          onClick={() => {
            // iterate userLikes to check if my id already liked it
            const myLike = booking?.userLikes?.filter((like) => {
              return like.user?.id === me!.id;
            })[0];

            // check if user already liked the booking
            if (myLike && myLike.value === 1) {
              dislikeBooking({
                options: {
                  bookingId: booking!.id,
                },
              });
            } else {
              likeBooking({
                options: {
                  bookingId: booking!.id,
                },
              });
            }
          }}
        >
          <FontAwesomeIcon icon={faThumbsUp} /> {booking?.likes}
        </button>
      )}
    </div>
  );
}
