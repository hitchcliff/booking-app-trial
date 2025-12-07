import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Appointment, Booking, User } from "../gen/graphql";
import { useGlobalSelector } from "../redux/features/global.selector";
import BookingButtons from "./BookingButtons";
import Comments from "./Comments";
import Loader from "./Loader";
import PosterInfo from "./PosterInfo";
import {
  faCalendar,
  faDotCircle,
  faHeart,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import Divider from "./Divider";
import Feeds from "./Feeds";
import { useDayJs } from "../hooks";
import Link from "next/link";
import RoutePattern from "../routes/RoutePattern";

interface AgentFeedProps {
  user: User;
}

const AgentFeed = ({ user, ...post }: AgentFeedProps) => {
  if (!post) return <Loader />;
  const bookings = user.bookings;

  return (
    <div className="relative bg-light text-dark dark:bg-dark dark:text-light rounded-md overflow-hidden p-5 w-full">
      <div className="flex flex-row justify-start">
        <div className="w-12 h-12">
          <div className="w-12 h-12 rounded-full m-0 dark:bg-white bg-dark overflow-hidden">
            {user?.picture && (
              <img
                className="object-cover h-full w-full object-top m-0"
                src={user!.picture}
                alt={user!.name}
              />
            )}
          </div>
        </div>

        <div className="px-5 w-full capitalize">
          <ul>
            <li>
              <b>Name: </b>
              {user.name}
            </li>
            <li>
              <b>Email: </b>
              {user.email}
            </li>
            <li>
              <b>Account Type: </b>
              {user.accountType}
            </li>
            <li>
              <b>Phone Number: </b>
              {user.phoneNumber}
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full mt-5">
        <Divider />
        <h6 className="heading mt-5">My Bookings: </h6>
        <div className="grid grid-cols-3 md:grid-cols-4 mt-2 gap-2">
          {bookings?.map((booking) => (
            <Link
              href={`/${RoutePattern.BOOKING}/${booking.id}`}
              className="opacity-80 mr-2 flex flex-row gap-2"
            >
              <span>{booking.title}</span>
              <span>
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="text-green-400 mr-1"
                />
                {useDayJs({ fromNow: booking.createdAt })}
              </span>
              <span>
                <FontAwesomeIcon icon={faHeart} className="mr-1" />
                {booking.likes}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentFeed;
