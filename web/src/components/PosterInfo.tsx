import { faDotCircle, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "../gen/graphql";
import { useAuthService, useDayJs } from "../hooks";
import Badge from "./Badge";

interface PosterInfoProps {
  title: string;
  body: string;
  updatedAt: string;
  user?: User | null;
}

const PosterInfo = ({ body, title, user, updatedAt }: PosterInfoProps) => {
  const [{ user: u }] = useAuthService();
  const date = useDayJs({ fromNow: updatedAt });

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex w-full">
          <h2 className="font-bold capitalize mr-2">
            {user?.name}
            {user?.emailVerified && <Badge />}
          </h2>
          <span className="opacity-80 mr-2">{user?.email}</span>
          <span className="opacity-80 mr-2">
            <FontAwesomeIcon
              icon={faDotCircle}
              className="mr-2 text-green-400"
            />
            {date}
          </span>
        </div>
        {/* {u!.id === user?.id && (
          <div className="ml-auto cursor-pointer hover:opacity-80">
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        )} */}
      </div>
      <div className="mt-2">
        <span className="whitespace-nowrap overflow-ellipses font-bold">
          {title}
        </span>
        <p>{body}</p>
      </div>
    </>
  );
};

export default PosterInfo;
