import {
  faDeleteLeft,
  faDotCircle,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeleteBookingByIdMutation, User } from "../gen/graphql";
import { useAuthService, useDayJs } from "../hooks";
import Badge from "./Badge";
import { UserAccountType } from "../utils/enums";

interface PosterInfoProps {
  id: number;
  title: string;
  body: string;
  updatedAt: string;
  user?: User | null;
}

const PosterInfo = ({ id, body, title, user, updatedAt }: PosterInfoProps) => {
  const date = useDayJs({ fromNow: updatedAt });
  const [, deleteBooking] = useDeleteBookingByIdMutation();
  const [{ user: me }] = useAuthService();

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
        {me?.accountType === UserAccountType.AGENT && me?.id === user?.id && (
          <button
            onClick={() => {
              deleteBooking({ id: id });
            }}
            className="ml-auto cursor-pointer hover:opacity-80 text-red-500"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
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
