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
    <button className="bg-light shadow-md rounded-full py-1 px-2" {...props}>
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );
}
