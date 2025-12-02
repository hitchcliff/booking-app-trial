import { Form, Formik } from "formik";
import InputField from "./Form/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import IconButton from "./IconButton";

const SearchBar = () => {
  return (
    <div className="flex flex-col w-full text-dark dark:text-light ">
      <h2 className="font-bold">Search</h2>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={() => {
          console.log("submitted");
        }}
      >
        {() => (
          <Form className="relative">
            <InputField
              name="search"
              placeholder="Search something..."
              className="bg-light text-dark dark:bg-dark dark:text-light p-2 rounded-md"
            />
            <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10 ">
              <IconButton type="submit" icon={faSearch} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchBar;
