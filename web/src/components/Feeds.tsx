import { Appointment, Booking } from "../gen/graphql";
import { useGlobalSelector } from "../redux/features/global.selector";
import BookingButtons from "./BookingButtons";
import Comments from "./Comments";
import Loader from "./Loader";
import PosterInfo from "./PosterInfo";

interface FeedsProps {
  appointments?: Appointment[]; // the appointments of the booking
  booking: Booking;
  showBookingButton?: boolean;
}

const Feeds = ({
  appointments,
  booking,
  showBookingButton = true,
  ...post
}: FeedsProps) => {
  const { toggleComments } = useGlobalSelector();
  const { id, title, body, updatedAt, user, appointments: appoints } = booking;

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
            id={id}
            title={title}
            body={body}
            user={user}
            updatedAt={updatedAt}
            appointments={appointments}
            showBookMarker={true}
          />
          {showBookingButton && <BookingButtons booking={booking} />}
          {toggleComments && <Comments />}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
