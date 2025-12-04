import { useState } from "react";
import Button from "../components/Button";
import CreateFeed from "../components/CreateFeed";
import Feeds from "../components/Feeds";
import FriendSuggestions from "../components/FriendSuggestions";
import InfoBar from "../components/InfoBar";
import Loader from "../components/Loader";
import PrivateRoute from "../components/Route/PrivateRoute";
import SearchBar from "../components/SearchBar";
import Trendings from "../components/Trendings";
import { useMeQuery, useReadAllBookingsQuery } from "../gen/graphql";
import { useGlobalSelector } from "../redux/features/global.selector";

const Home = () => {
  const [take, setTake] = useState<number>(5);
  const { search } = useGlobalSelector();
  const [{ data, fetching }] = useReadAllBookingsQuery({
    variables: {
      options: {
        skip: 0,
        take,
        search,
      },
    },
  });

  const [{ data: user }] = useMeQuery();

  if (!data?.readAllBookings) return <Loader />;

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
        {user?.me != null && user.me.accountType === "agent" && <CreateFeed />}
        {data?.readAllBookings.map((booking, idx) => (
          <Feeds
            key={idx}
            booking={booking}
            appointments={booking.appointments!}
          />
        ))}
        {search.length <= 0 && (
          <div className="text-center">
            <Button
              isSubmitting={fetching}
              onClick={() => {
                setTake((prev) => prev + 2);
              }}
            >
              Load More
            </Button>
          </div>
        )}
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

export default PrivateRoute(Home, { ssr: true });
