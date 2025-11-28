import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useRegisterMutation } from "../../gen/graphql";
import RoutePattern from "../../routes/RoutePattern";
import toRecordError from "../../utils/toRecordError";
import Button from "../Button";
import InputField from "./InputField";

const RegisterForm = () => {
  const [, register] = useRegisterMutation();
  const route = useRouter();

  return (
    <>
      <div className="bg-white rounded-md shadow-md p-5 mt-5">
        <Formik
          initialValues={{
            name: "",
            email: "",
            confirmPassword: "",
            password: "",
            dialCode: "+63",
            phoneNumber: "1234567890",
            acceptedTermsAndConditions: true,
            accountType: "booker",
          }}
          onSubmit={async (values, { setErrors }) => {
            const res = await register({ options: values });

            if (res.data?.register.errors) {
              setErrors(toRecordError(res.data.register.errors));
            } else if (res.data?.register.user) {
              route.push(RoutePattern.HOME);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-2">
                <InputField
                  name="name"
                  placeholder="New name"
                  label="name"
                  type="text"
                />
              </div>

              <div className="mt-2">
                <InputField
                  type="email"
                  label="email"
                  name="email"
                  placeholder="new email"
                />
              </div>

              <div className="mt-2">
                <InputField
                  name="password"
                  placeholder="New Password"
                  label="password"
                  type="password"
                />
              </div>
              <div className="mt-2">
                <InputField
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  label="confirm password"
                  type="password"
                />
              </div>
              <div className="mt-5">
                <Button type="submit" isSubmitting={isSubmitting}>
                  Signup
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default RegisterForm;
