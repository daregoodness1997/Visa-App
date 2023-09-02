import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Must be a valid email")
    .required("Email address is required!"),
  password: yup.string().trim().required("Password is required"),
});
export const registerSchema = yup.object().shape({
  name: yup.string().trim().required("Password is required"),
  email: yup
    .string()
    .trim()
    .email("Must be a valid email")
    .required("Email address is required!"),
  password: yup.string().trim().required("Password is required"),
});
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Must be a valid email")
    .required("Email address is required!"),
});
