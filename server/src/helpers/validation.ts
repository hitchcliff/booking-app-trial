import { FieldInput } from "../utils/enums";
import { CreateBookingInput, FieldError, RegisterInput } from "../utils/type";

/**
 * Validation for Register
 * @param options
 */
export class MyValidation {
  public errors: FieldError[] = [];

  public validateRegister(options: RegisterInput) {
    this.email(options.email);
    this.password(options.password);
    this.isMatch(options.password, options.confirmPassword);
    this.emptyText("name", options.name);
    this.emptyText("dialCode", options.dialCode);
    this.emptyText("phoneNumber", options.phoneNumber);
    this.accepted(options.acceptedTermsAndConditions);

    return this.errors;
  }

  public validateBooking(options: CreateBookingInput) {
    this.emptyText(FieldInput.TITLE, options.title);
    this.emptyText(FieldInput.BODY, options.body);

    return this.errors;
  }

  public emptyText(field: string, text?: any) {
    if (text === null || text.length === 0) {
      this.errors.push({
        field: field,
        message: "required input",
      });
    }
  }

  public isMatch(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      this.errors.push(
        {
          field: "password",
          message: "must match to confirm password",
        },
        {
          field: "confirm_password",
          message: "must match to password",
        }
      );
    }
  }

  public password(password: string) {
    if (password.length < 6) {
      // // Check for uppercase letters
      // if (!value.contains(RegExp(r'[A-Z]'))) {
      //   return 'Password must contain at least one uppercase letter.';
      // }

      // // Check for numbers
      // if (!value.contains(RegExp(r'[0-9]'))) {
      //   return 'Password must contain at least one number.';
      // }

      // // Check for special characters
      // if (!value.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
      //   return 'Password must contain at least one special character.';
      // }

      this.errors.push({
        field: "password",
        message: "Password must be at least 6 characters long.",
      });
    }
  }

  email(email: string) {
    // Regular expression for email validation
    const emailRegExp = new RegExp(
      "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
    );

    if (!emailRegExp.exec(email)) {
      this.errors.push({
        field: "email",
        message: "Invalid email address.",
      });
    }
  }

  accepted(value: boolean) {
    if (!value) {
      this.errors.push({
        field: "terms_and_conditions",
        message: "must accept terms and conditions to proceed",
      });
    }
  }
}
