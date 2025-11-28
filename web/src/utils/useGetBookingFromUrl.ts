import { useReadBookingByIdQuery } from "../gen/graphql";
import { useGetIntId } from "./useGetIntId";

export function useGetBookingFromUrl() {
  const intId = useGetIntId();

  return useReadBookingByIdQuery({
    variables: {
      id: intId,
    },
  })[0];
}
