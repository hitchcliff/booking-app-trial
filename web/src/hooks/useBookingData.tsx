import { useState } from "react";
import { CombinedError } from "urql";
import {
  ReadAllAppointmentsQuery,
  ReadAllMyAppointmentsQuery,
  useReadAllMyAppointmentsQuery,
} from "../gen/graphql";
import useAuthService from "./useAuthService";

export default function useBookingData() {
  const [appointment, setAppointment] = useState<
    ReadAllMyAppointmentsQuery | ReadAllAppointmentsQuery | undefined
  >();
  const [fetching, setFetching] = useState<boolean>();
  const [error, setError] = useState<CombinedError | undefined>();
  const [{ user }] = useAuthService();

  if (user?.accountType === "agent") {
    const [{ data: appointment, fetching, error }] =
      useReadAllMyAppointmentsQuery();

    setAppointment(appointment);
    setFetching(fetching);
    setError(error);
  }

  return [{ appointment, fetching, error }];
}
