import {
  faCheckCircle,
  faDeleteLeft,
  faDotCircle,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Appointment,
  useDeleteAppointmentByIdMutation,
  useDeleteBookingByIdMutation,
  User,
} from "../gen/graphql";
import { useAuthService, useDayJs } from "../hooks";
import Badge from "./Badge";
import { UserAccountType } from "../utils/enums";
import Button from "./Button";

interface PosterInfoProps {
  id: number;
  title: string;
  body: string;
  updatedAt: string;
  createdAt: string;
  user?: User | null;
  appointment?: Appointment; // single appointment
  appointments?: Appointment[];
  showBookMarker?: boolean;
  showCancelAppointmentButton?: boolean;
}

const PosterInfo = ({
  id,
  body,
  title,
  updatedAt,
  createdAt,
  user,
  appointment,
  appointments,
  showBookMarker = true,
  showCancelAppointmentButton = false,
}: PosterInfoProps) => {
  const date = useDayJs({ fromNow: createdAt });
  const [, deleteBooking] = useDeleteBookingByIdMutation();
  const [{ user: me }] = useAuthService();
  const [, deleteAppointmentById] = useDeleteAppointmentByIdMutation();

  // checked if user is booked
  const isUserBooked: boolean =
    appointments?.findIndex(
      (appointment) => appointment?.user?.id === me?.id
    ) !== -1;

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

        {/* if agent or the owner */}
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

        {/* if they are already booked at this feed */}
        {showBookMarker &&
          me?.accountType !== UserAccountType.AGENT &&
          isUserBooked && (
            <span className="text-green-500 whitespace-nowrap">
              <FontAwesomeIcon icon={faCheckCircle} /> Already booked
            </span>
          )}

        {/* if they are already booked at this feed */}
        {showCancelAppointmentButton &&
          me?.accountType !== UserAccountType.AGENT &&
          isUserBooked && (
            <button
              aria-label="cancel appointment"
              className="text-red-500 whitespace-nowrap"
              onClick={() => {
                deleteAppointmentById({
                  id: appointment?.id!,
                });
              }}
            >
              <FontAwesomeIcon icon={faTrash} /> Cancel appointment
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
