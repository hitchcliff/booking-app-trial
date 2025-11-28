import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import InputField from "./Form/InputField";
import Img from "next/image";
import PROFILE_IMG from "../assets/images/profile.jpg";
import ButtonSecondary from "./ButtonSecondary";
import { Maybe } from "graphql/jsutils/Maybe";
import { User } from "../gen/graphql";
import Button from "./Button";

interface BookedProps {
  user: Maybe<User>;
}

export default function Booked({ user }: BookedProps) {
  return (
    <div className="p-5">
      <span>Members who booked: </span>
      <div className="mt-5 flex">
        <div className="h-7 w-7 mr-5 border-2 dark:border-dark rounded-full overflow-hidden">
          {user?.picture && (
            <img
              className="object-cover h-full w-full object-top m-0"
              src={user!.picture}
              alt={user!.name}
            />
          )}
        </div>
        <p>{user?.name}</p>
        <div className="ml-auto">
          <Button className="text-red-500">
            Cancel appointment <FontAwesomeIcon icon={faTrash} />
          </Button>
        </div>
      </div>
    </div>
  );
}
