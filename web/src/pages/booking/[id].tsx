import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonSecondary from "../../components/ButtonSecondary";
import Feeds from "../../components/Feeds";
import FriendSuggestions from "../../components/FriendSuggestions";
import InfoBar from "../../components/InfoBar";
import Layout from "../../components/Layout";
import PrivateRoute from "../../components/Route/PrivateRoute";
import SearchBar from "../../components/SearchBar";
import Trendings from "../../components/Trendings";
import { useGetBookingFromUrl } from "../../utils/useGetBookingFromUrl";
import { useMeQuery } from "../../gen/graphql";

const Booking = () => {
  const { data, fetching, error } = useGetBookingFromUrl();
  const [{ data: user }] = useMeQuery();

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

  if (!data?.readBookingById) {
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
        <Feeds booking={data.readBookingById} showBookingButton={false} />
        {data!.readBookingById?.user?.id !== user?.me?.id && (
          <ButtonSecondary className="mr-5 btn-primary">
            <FontAwesomeIcon className="mr-2" icon={faThumbsUp} />
            Set appointment
          </ButtonSecondary>
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

export default PrivateRoute(Booking, { ssr: true });
