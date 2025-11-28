import { Appointment, Booking } from "../gen/graphql";
import { useGlobalSelector } from "../redux/features/global.selector";
import BookingButtons from "./BookingButtons";
import Comments from "./Comments";
import Loader from "./Loader";
import PosterInfo from "./PosterInfo";
import PostReactions from "./PostReactions";

interface FeedsProps {
  appointment: Appointment;
  showBookingButton?: boolean;
}

const MyFeeds = ({
  appointment,
  showBookingButton = true,
  ...post
}: FeedsProps) => {
  const { toggleComments } = useGlobalSelector();
  const { user, booking, date, from, to } = appointment;

  if (!post) return <Loader />;

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

        <div className="px-5 w-full">
          <PosterInfo
            title={booking!.title}
            body={booking!.body}
            user={user}
            updatedAt={booking?.updatedAt}
          />
          {showBookingButton && <BookingButtons booking={booking} />}
          {toggleComments && <Comments />}
        </div>
      </div>
    </div>
  );
};

export default MyFeeds;
