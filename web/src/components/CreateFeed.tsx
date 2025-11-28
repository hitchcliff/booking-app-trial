import { faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import Button from "./Button";
import TextAreaField from "./Form/TextAreaField";
import { useCreateBookingMutation } from "../gen/graphql";
import InputField from "./Form/InputField";
import Divider from "./Divider";

const CreateFeed = () => {
  const [, createBooking] = useCreateBookingMutation();

  return (
    <div className="flex flex-col rounded-md bg-light text-dark dark:text-light dark:bg-dark w-full shadowm-sm overflow-hidden">
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values, { resetForm }) => {
          await createBooking({ options: values });

          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              className="bg-transparent p-5 outline-none"
              name="title"
              placeholder="Your title"
            />
            <Divider />
            <TextAreaField
              className="w-full p-5 dark:bg-dark dark:text-light outline-none"
              name="body"
              placeholder="Create a booking"
              rows={1}
            />
            <div className="p-5 flex flex-row items-center justify-between">
              <div>
                <Button type="submit" isSubmitting={isSubmitting}>
                  Create
                </Button>
              </div>
              {/* <div className="gap-5 flex">
                <button>
                  <FontAwesomeIcon icon={faImage} />
                </button>
                <button>
                  <FontAwesomeIcon icon={faVideo} />
                </button>
                <span>Drag and drop</span>
              </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateFeed;
