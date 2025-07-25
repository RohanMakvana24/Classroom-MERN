// src/components/LoginForm.js
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/loginForm.css";
import "remixicon/fonts/remixicon.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useFormik } from "formik";
import LoginSchema from "../../ValidationSchema/Authentication/LoginSchema";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { useGoogleLogin } from "@react-oauth/google";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isGoogleLogging, setisGoogleLogging] = useState(false);
  const [isLogin, setisLogin] = useState(false);

  const from =
    location.state?.from?.pathname + (location.state?.from?.search || "") ||
    "/";

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setisLogin(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/login`,
          values
        );
        if (response.data.success) {
          setisLogin(false);
          toast.success(response.data.message);
          dispatch(
            login({
              user: response.data.data.user,
              token: response.data.data.token,
            })
          );
          navigate(from, { replace: true }); // ✅ Redirect to original page
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        setisLogin(false);
        toast.error(
          error.response?.data?.message || "Something went wrong during login."
        );
      }
    },
  });

  const googleResponse = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/google-login?code=${
            authResult["code"]
          }`
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setisGoogleLogging(false);
          dispatch(
            login({ user: response.data.user, token: response.data.token })
          );
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      setisGoogleLogging(false);
      toast.error(error.response?.data?.message || "Google login failed.");
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth-code",
  });

  const handleGoogleLoginClick = () => {
    handleGoogleLogin();
    setisGoogleLogging(true);
  };

  return (
    <div className="container">
      <DotLottieReact
        src="https://lottie.host/bd0132da-e60f-4b84-9802-465119089b4f/izT9anDj4k.lottie"
        loop
        autoplay
        style={{
          height: "150px",
          width: "150px",
          margin: "0 auto",
          marginTop: "-30px",
        }}
      />
      <h1>Welcome Back,</h1>
      <p>Make it work, make it right, make it fast.</p>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.email && formik.errors.email ? "is-invalid" : ""
            }`}
            placeholder="Enter email"
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}>
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`form-control ${
              formik.touched.password && formik.errors.password
                ? "is-invalid"
                : ""
            }`}
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}>
              {formik.errors.password}
            </div>
          )}
        </div>
        <button type="submit">
          {isLogin ? (
            <>
              <div>
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
          ) : (
            <>LOGIN</>
          )}
        </button>
        <Link to="/forgot-password" className="forgot-password">
          Forget Password?
        </Link>
      </form>

      <p>OR</p>
      <button
        onClick={handleGoogleLoginClick}
        className="google-btn googleHover"
      >
        {isGoogleLogging ? (
          <>
            <div>
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <i className="ri-google-fill"></i> Sign-in with Google{" "}
          </>
        )}
      </button>

      <p className="mt-3">
        Don't have an Account? <Link to="/signup">SignUp</Link>
      </p>
    </div>
  );
};

export default LoginForm;
