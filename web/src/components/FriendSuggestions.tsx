import Image from "next/image";
import PROFILE_IMG from "../assets/images/profile.jpg";
import Badge from "./Badge";
import ButtonSecondary from "./ButtonSecondary";
import { useGetLatestUsersQuery } from "../gen/graphql";
import { useRouter } from "next/router";
import RoutePattern from "../routes/RoutePattern";

const FriendSuggestions = () => {
  const [{ data }] = useGetLatestUsersQuery({
    variables: {
      take: 5,
    },
  });
  const route = useRouter();
  return (
    <div className="flex flex-col w-full text-dark dark:text-light">
      <h2 className="font-bold">Latest Users</h2>
      <div className="bg-light text-dark dark:bg-dark dark:text-light p-5 overflow-hidden shadow-sm rounded-md ">
        {data?.getLatestUsers.map((user) => (
          <div
            onClick={() => {
              route.push(`/${RoutePattern.USER}/${user.id}`);
            }}
            className="py-2 flex flex-row"
          >
            <div className="h-12 w-12 mr-5 rounded-full bg-white overflow-hidden">
              <img
                className="object-cover"
                src={user.picture ?? ""}
                alt={user.name}
              />
            </div>
            <div className="">
              <h2 className="font-bold text-ellipsis overflow-hidden whitespace-nowrap w-56 capitalize">
                {user.name} {user.emailVerified && <Badge />}
              </h2>

              <ButtonSecondary>Add Friend</ButtonSecondary>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendSuggestions;
