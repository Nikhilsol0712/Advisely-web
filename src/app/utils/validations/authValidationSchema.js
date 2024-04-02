import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required."),
  lastName: Yup.string().required("Last Name is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters.")
    .matches(/[a-z]/, "Password must contain lowercase letter.")
    .matches(/[A-Z]/, "Password must contain uppercase letter.")
    .matches(/[0-9]/, "Password must contain number.")
    .matches(/[!@#$%^&*()_+]/, "Password must contain special character."),
  phoneNumber: Yup.string()
    .required("Phone Number is required.")
    .matches(/^[0-9]{10}$/, "Invalid phone number format."),
  dateOfBirth: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(), "Date of Birth cannot be in the future"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});
