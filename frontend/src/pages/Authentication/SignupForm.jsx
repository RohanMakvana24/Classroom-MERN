import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import "../../assets/css/loginForm.css";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useFormik } from "formik";
import SignupSchema from "../../ValidationSchema/Authentication/SignupSchema";
import axios from "axios";
import toast from "react-hot-toast";
import EmailVerification from "./EmailVerification";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
const SignupForm = () => {
  const navigate = useNavigate();
  const [signupButtonLoading, setsignupButtonLoading] = useState(false);
  const dispatch = useDispatch();

  // ☕︎ Signup And Verification Hide and Show ☕︎ //
  const [isSignupSuccessfull, setIsSignupSuccessful] = useState(() => {
    return localStorage.getItem("isSignupSuccessfull") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isSignupSuccessfull", isSignupSuccessfull);
  }, [isSignupSuccessfull]);

  useEffect(() => {
    let interval;
    if (isSignupSuccessfull) {
      interval = setInterval(() => {
        checkVerificationStatus();
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSignupSuccessfull]);

  // ~~~~~~~~~~~~~~~~~~~~ Section End ~~~~~~~~~~~~~~~~~~~~~~ //

  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("signupTimer");
    if (savedTime) {
      const timeDiff = Math.floor((Date.now() - parseInt(savedTime)) / 1000);
      return Math.max(120 - timeDiff, 0);
    }
    return 120;
  });

  useEffect(() => {
    if (!isSignupSuccessfull) return;
    if (timeLeft === 120) {
      localStorage.setItem("signupTimer", Date.now().toString());
    }
    if (timeLeft === 0) return;

    const timer = setInterval(async () => {
      const userId = localStorage.getItem("u_id");

      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          localStorage.removeItem("signupTimer");

          const deleteUser = async () => {
            try {
              const response = await axios.delete(
                `${
                  import.meta.env.VITE_APP_BASE_URL
                }/api/v1/auth/deleteUser/${userId}`
              );

              if (response.data.success) {
                toast.success(response.data.message);
                setIsSignupSuccessful(false);
                localStorage.removeItem("u_id");
              } else {
                toast.error(response.data.message);
              }
            } catch (error) {
              toast.error(
                error.response?.data?.message ||
                  "Something went wrong. Try again!"
              );
            }
          };
          deleteUser();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [timeLeft, isSignupSuccessfull]);

  // ☕︎ Signup Form Submiting Handler ☕︎ //

  const formik = useFormik({
    initialValues: { fullname: "", email: "", password: "", profile: null },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setsignupButtonLoading(true);
        localStorage.setItem("fullname", values.fullname);
        localStorage.setItem("email", values.email);
        const formData = new FormData();
        formData.append("fullname", values.fullname);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("profile", values.profile);

        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/signup`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          setsignupButtonLoading(false);
          // Store user data in localStorage instead of Redux
          localStorage.setItem("u_id", response.data.u_id);
          localStorage.setItem("user_data", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);

          setIsSignupSuccessful(true);
          setTimeLeft(120);
          localStorage.setItem("signupTimer", Date.now().toString());
          localStorage.setItem("isSignupSuccessfull", "true");

          resetForm();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        setsignupButtonLoading(false);

        toast.error(
          error.response?.data?.message || "Something went wrong. Try again!"
        );
      }
    },
  });

  // ☕︎ Check Verification Status ☕︎ //
  const checkVerificationStatus = async () => {
    try {
      const userId = localStorage.getItem("u_id");
      if (!userId) return;

      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/isverify/${userId}`
      );

      if (response.data.success) {
        toast.success("Your account is verified!");

        // Retrieve stored user data
        const storedUser = JSON.parse(localStorage.getItem("user_data"));
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
          // Dispatch Redux action after verification success
          dispatch(login({ user: storedUser, token: storedToken }));
          // Cleanup localStorage and navigate
          localStorage.removeItem("isSignupSuccessfull");
          localStorage.removeItem("signupTimer");
          localStorage.removeItem("user_data");
          localStorage.removeItem("token");
          localStorage.removeItem("u_id");
          localStorage.removeItem("email");
          localStorage.removeItem("fullname");
        }
        navigate("/home");
      }
    } catch (error) {}
  };

  return (
    <>
      {!isSignupSuccessfull ? (
        <div className="container">
          <DotLottieReact
            src="https://lottie.host/453c0d82-74a8-4d6f-b254-5910adb70e4b/CvY3mDmWFx.lottie"
            loop
            autoplay
            style={{
              height: "200px",
              width: "200px",
              margin: "0 auto",
              marginTop: "-50px",
            }}
          />
          <h1>
            <img
              style={{ height: "22px", width: "22px", marginBottom: "5px" }}
              src="https://img.icons8.com/?size=100&id=asrpF0KlPITb&format=png&color=000000"
            />
            Welcome
            <img
              style={{ height: "22px", width: "22px", marginBottom: "5px" }}
              src="https://img.icons8.com/?size=100&id=asrpF0KlPITb&format=png&color=000000"
            />
          </h1>
          <p>Create your profile to start your journey</p>
          <form onSubmit={formik.handleSubmit}>
            {/* Full Name Input */}
            <div className="form-group">
              <label htmlFor="full-name">Full Name:</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                style={{ fontSize: "13px", height: "40px" }}
                className={`form-control ${
                  formik.touched.fullname && formik.errors.fullname
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your full name"
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <span
                  style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}
                >
                  {formik.errors.fullname}
                </span>
              )}
            </div>

            {/* E-Mail Input */}
            <div className="form-group">
              <label htmlFor="email">E-Mail:</label>
              <input
                type="email"
                id="email"
                style={{ fontSize: "13px", height: "40px" }}
                name="email"
                className={`form-control ${
                  formik.touched.email && formik.errors.email
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email && (
                <span
                  style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}
                >
                  {formik.errors.email}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                style={{ fontSize: "13px", height: "40px" }}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Password"
              />
              {formik.touched.password && formik.errors.password && (
                <span
                  style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}
                >
                  {formik.errors.password}
                </span>
              )}
            </div>

            {/* Profile Image Input */}
            <div className="form-group">
              <label htmlFor="profile-image">Profile Image:</label>
              <input
                type="file"
                id="profile-image"
                name="profile"
                className={`form-control ${
                  formik.touched.profile && formik.errors.profile
                    ? "is-invalid"
                    : ""
                }`}
                onChange={(event) => {
                  const profile = event.currentTarget.files[0];
                  formik.setFieldValue("profile", profile);
                }}
                accept="image/*"
              />
              {formik.touched.profile && formik.errors.profile && (
                <span
                  style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}
                >
                  {formik.errors.profile}
                </span>
              )}
            </div>
            <button type="submit">
              {" "}
              {signupButtonLoading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                "SIGNUP"
              )}
            </button>
          </form>
          <p className="mt-3">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <br />
          <p className="last-policy-description">
            By signing up, you agree to our terms and conditions.
          </p>
        </div>
      ) : (
        <EmailVerification timeLeft={timeLeft} />
      )}
    </>
  );
};

export default SignupForm;
