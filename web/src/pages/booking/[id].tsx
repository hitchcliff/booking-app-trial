import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Button from "../../components/Button";
import Feeds from "../../components/Feeds";
import InputField from "../../components/Form/InputField";
import FriendSuggestions from "../../components/FriendSuggestions";
import InfoBar from "../../components/InfoBar";
import PrivateRoute from "../../components/Route/PrivateRoute";
import SearchBar from "../../components/SearchBar";
import Trendings from "../../components/Trendings";
import { useCreateAppointmentMutation, useMeQuery } from "../../gen/graphql";
import { ThrowError, ThrowSuccess } from "../../utils/swal";
import toRecordError from "../../utils/toRecordError";
import { useGetBookingFromUrl } from "../../utils/useGetBookingFromUrl";

const Booking = () => {
  const { data, fetching, error } = useGetBookingFromUrl();
  const [{ data: user }] = useMeQuery();
  const [, setAppointment] = useCreateAppointmentMutation();

  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.readBookingById) {
    return (
      <div>
        <div>could not find booking</div>
      </div>
    );
  }

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
        <Feeds
          booking={data.readBookingById}
          showBookingButton={false}
          appointments={data.readBookingById.appointments!}
        />
        {data!.readBookingById?.user?.id !== user?.me?.id && (
          <div className="bg-light dark:bg-dark rounded-md shadow-md p-5">
            <Formik
              key={4}
              initialValues={{
                id: data.readBookingById.id,
                date: "",
                from: "",
                to: "",
              }}
              onSubmit={async (values, { setErrors, resetForm }) => {
                try {
                  const { data, error } = await setAppointment({
                    options: values,
                  });

                  if (data?.createAppointment.errors) {
                    setErrors(toRecordError(data.createAppointment.errors));
                  } else if (data?.createAppointment.appointment) {
                    ThrowSuccess({ text: "You booked an appointment!" });

                    resetForm();
                  } else {
                    throw new Error(error?.message);
                  }
                } catch (errors: any) {
                  ThrowError({
                    text: errors,
                  });
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex flex-row w-full gap-2 mb-5">
                    <div>
                      <InputField type="date" name="date" label="date" />
                    </div>
                    <InputField type="time" name="from" label="from" />
                    <InputField type="time" name="to" label="to" />
                  </div>

                  <Button type="submit" isSubmitting={isSubmitting}>
                    <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                    Set appointment
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        )}
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
