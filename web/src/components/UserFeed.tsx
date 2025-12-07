import { faCalendar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { User } from "../gen/graphql";
import { useDayJs } from "../hooks";
import RoutePattern from "../routes/RoutePattern";
import Divider from "./Divider";
import Loader from "./Loader";

interface UserFeedProps {
  user: User;
}

const UserFeed = ({ user, ...post }: UserFeedProps) => {
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

      {bookings?.length !== 0 && (
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
      )}
    </div>
  );
};

export default UserFeed;
