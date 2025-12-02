import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProp;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <button
      className="bg-light dark:bg-dark shadow-md rounded-full py-1 px-2 hover:bg-primary hover:text-light"
      {...props}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
}
