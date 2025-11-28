import {
  faThumbsUp,
  faComment,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGlobalService from "../hooks/useGlobalService";
import { useGlobalSelector } from "../redux/features/global.selector";
import ButtonSecondary from "./ButtonSecondary";
import { Booking, Maybe, useMeQuery, User } from "../gen/graphql";

interface BookingButtons {
  bookingOwner?: Maybe<User>;
}

export default function BookingButtons({ bookingOwner }: BookingButtons) {
  const { setToggleComments } = useGlobalService();
  const { toggleComments } = useGlobalSelector();
  const [{ data }] = useMeQuery();

  return (
    <div className="mt-5 flex flex-row">
      {data!.me?.id !== bookingOwner?.id && (
        <ButtonSecondary className="mr-5 btn-primary">
          <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
          Set appointment
        </ButtonSecondary>
      )}

      <button
        onClick={() => setToggleComments(!toggleComments)}
        className="mr-5"
      >
        <FontAwesomeIcon className="mr-2" icon={faComment} />
        Write a comment
      </button>

      <button
        onClick={() => setToggleComments(!toggleComments)}
        className="italic text-blue-500"
      >
        View detail
      </button>
    </div>
  );
}
