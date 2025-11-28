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
import { useRouter } from "next/router";
import RoutePattern from "../routes/RoutePattern";

interface BookingButtons {
  booking?: Maybe<Booking>;
}

export default function BookingButtons({ booking }: BookingButtons) {
  const { setToggleComments } = useGlobalService();
  const { toggleComments } = useGlobalSelector();
  const [{ data }] = useMeQuery();
  const router = useRouter();

  return (
    <div className="mt-5 flex flex-row">
      {data!.me?.id !== booking?.user?.id && (
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
        onClick={() => {
          router.push(RoutePattern.BOOKING + "/" + booking?.id);
        }}
        className="italic text-blue-500"
      >
        View detail
      </button>
    </div>
  );
}
