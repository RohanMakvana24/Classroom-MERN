import { yupToFormErrors } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object({
  fullname: Yup.string()
    .min(5, "The Fullname must be at least 5 character long")
    .required("Fullname is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than or equal to 20 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Requires at least one uppercase letter
    .matches(/[a-z]/, "Password must contain at least one lowercase letter") // Requires at least one lowercase letter
    .matches(/[0-9]/, "Password must contain at least one number") // Requires at least one number
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
    profile : Yup.mixed()
    .required("File is required")
    .test(
      "fileFormat",
      "Unsupported File Format. Please upload a PNG, JPG, or JPEG image.",
      (value) => {
        return value && (value.type === "image/png" || value.type === "image/jpeg");
      }
    ),
});

export default SignupSchema;
