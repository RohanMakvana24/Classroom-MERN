import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import ForgotPasswordSchma from "../../ValidationSchema/Authentication/ForgotPasswordSchema";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {

  const navigate = useNavigate();
  //handle Form Using The Formik
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: ForgotPasswordSchma,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/forgot-password`,values
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate(`/otp-verification?email=${response.data.email}`);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    },
  });
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-90"
      style={{
        marginTop: "222px",
        backgroundColor: "white", // Set background to white
      }}
    >
      <div
        className="card"
        style={{
          marginTop: "-90px",
          width: "380px",
          border: "none", // Removed shadow
          padding: "0 10px", // Padding added inside the card
        }}
      >
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center mx-auto mb-3"
            style={{
              width: "60px",
              height: "60px",
            }}
          >
            <i
              className="ri-lock-password-fill"
              style={{ fontSize: "1.5rem", color: "white" }}
            ></i>
          </div>
          <h3 className="fw-bold">Forgot Password?</h3>
          <p
            className="text-muted small"
            style={{
              marginLeft: "8px",
            }}
          >
            Enter your registered email address below to receive password reset
            instructions.
          </p>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            padding: "18px",
            marginLeft: "8px",
            marginTop: "-19px",
            width: "100%",
          }}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              id="email"
              placeholder="e.g. john@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                borderRadius: "4px",
                padding: "10px", // Padding added inside the input field
              }}
            />
            {formik.touched.email && formik.errors.email && (
              <div
                style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}
              >
                {formik.errors.email}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-danger w-100 py-2"
            style={{
              borderRadius: "10px",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#dc3545")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#e63946")}
          >
            Reset Password
          </button>
        </form>
        <div className="text-center mt-2">
          <small className="text-muted">
            Remember password?{" "}
            <Link to="/login" className="text-danger fw-bold">
              Sign In
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
