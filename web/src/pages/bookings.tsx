import { useRouter } from "next/router";
import Button from "../components/Button";
import Feeds from "../components/Feeds";
import FriendSuggestions from "../components/FriendSuggestions";
import InfoBar from "../components/InfoBar";
import MyFeeds from "../components/MyFeeds";
import PrivateRoute from "../components/Route/PrivateRoute";
import SearchBar from "../components/SearchBar";
import Trendings from "../components/Trendings";
import { useMeQuery, useReadAllMyAppointmentsQuery } from "../gen/graphql";
import { useGetBookingFromUrl } from "../utils/useGetBookingFromUrl";
import RoutePattern from "../routes/RoutePattern";

const Bookings = () => {
  const [{ data: appointment, fetching, error }] =
    useReadAllMyAppointmentsQuery();
  const router = useRouter();

  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!appointment?.readAllMyAppointments) {
    return (
      <div>
        <div>could not find booking</div>
      </div>
    );
  }

  return (
    <div className="relative bg-light-mode dark:bg-dark-mode flex flex-row min-h-screen gap-7 transition-all w-full">
      <div className="relative skeleton">
        <div className="opacity-0">
          <InfoBar />
        </div>
        <div className="fixed top-0 left-0 h-full">
          <InfoBar />
        </div>
      </div>

      <div className="relative py-7 w-full flex flex-col gap-7">
        {appointment.readAllMyAppointments.length <= 0 && (
          <div className="flex flex-row gap-5 items-center">
            <span>You have no bookings yet.</span>
            <Button
              onClick={() => {
                router.push(RoutePattern.HOME);
              }}
            >
              Go home
            </Button>
          </div>
        )}
        {appointment?.readAllMyAppointments.map((appointment, idx) => (
          <MyFeeds appointment={appointment} />
        ))}
      </div>

      <div className="relative py-7 pr-7 w-1/2">
        <div className="flex flex-col gap-7">
          <SearchBar />
          <FriendSuggestions />
          <Trendings />
        </div>
      </div>
    </div>
  );
};

export default PrivateRoute(Bookings, { ssr: true });
