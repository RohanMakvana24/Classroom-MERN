import * as Yup from "yup";

const NewPasswordSchema  = Yup.object().shape({
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
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
});

export default NewPasswordSchema;
