import dayjs from "dayjs";
import { Appointment } from "../gen/graphql";
import { useAuthService } from "../hooks";
import { useGlobalSelector } from "../redux/features/global.selector";
import Booked from "./Booked";
import BookingButtons from "./BookingButtons";
import Loader from "./Loader";
import PosterInfo from "./PosterInfo";

interface FeedsProps {
  appointment: Appointment;
  showBookingButton?: boolean;
}

const MyFeeds = ({
  appointment,
  showBookingButton = true,
  ...post
}: FeedsProps) => {
  const [{ user: me }] = useAuthService();
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
            id={booking!.id}
            title={booking!.title}
            body={booking!.body}
            user={booking!.user}
            updatedAt={booking?.updatedAt}
            showBookMarker={false}
            showCancelAppointmentButton={true}
          />
          <div className="mt-5">
            <span className="opacity-80 mr-2 font-bold">
              When: <span className="">{dayjs(date).format("MM/DD/YYYY")}</span>
            </span>
            <span className="opacity-80 mr-2 font-bold">
              Time:{" "}
              <span className="">
                {from} - {to}
              </span>
            </span>
          </div>
          {showBookingButton && (
            <BookingButtons
              showViewDetailButton={false}
              showCommentButton={false}
              booking={booking}
            />
          )}

          {/* this agent text is temporarily, potentially bug from graphql */}
          {me?.accountType === "agent" && <Booked user={appointment.user} />}
        </div>
      </div>
    </div>
  );
};

export default MyFeeds;
