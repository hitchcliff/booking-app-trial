import FriendSuggestions from "../../components/FriendSuggestions";
import InfoBar from "../../components/InfoBar";
import Layout from "../../components/Layout";
import PrivateRoute from "../../components/Route/PrivateRoute";
import SearchBar from "../../components/SearchBar";
import Trendings from "../../components/Trendings";

const Booking = () => {
  //   const result = useGetBookingFromUrl();

  //   if (loading) {
  //     return (
  //       <div>
  //         <div>loading...</div>
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return <div>{error.message}</div>;
  //   }

  //   if (!data?.post) {
  //     return (
  //       <div>
  //         <div>could not find booking</div>
  //       </div>
  //     );
  //   }

  //   console.log(data);
  //   console.log(result);

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
        Hello world
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
