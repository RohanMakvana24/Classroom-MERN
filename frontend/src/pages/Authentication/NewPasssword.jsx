import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewPasswordSchema from "../../ValidationSchema/Authentication/NewPasswordSchema";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  //handle Form Using The Formik
  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: NewPasswordSchema,
    onSubmit: async (values) => {
      try {
        const newValues = {
          email: email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        };
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/reset-password`,
          newValues
        );

        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        } else {
          console.log(error.response);
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
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
            className="rounded-circle bg-dark d-flex justify-content-center align-items-center mx-auto mb-3"
            style={{
              width: "60px",
              height: "60px",
            }}
          >
            <i
              className="fa fa-key"
              aria-hidden="true"
              style={{ fontSize: "1.5rem", color: "white" }}
            ></i>
          </div>
          <h3 className="fw-bold">New Password</h3>
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
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              id="password"
              placeholder="Enter your new password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                borderRadius: "4px",
                padding: "10px", // Padding added inside the input field
              }}
            />
            {formik.touched.password && formik.errors.password && (
              <div
                style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}
              >
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "is-invalid"
                  : ""
              }`}
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{
                borderRadius: "4px",
                padding: "10px", // Padding added inside the input field
              }}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <div
                  style={{ color: "red", fontSize: "13px", marginLeft: "2px" }}
                >
                  {formik.errors.confirmPassword}
                </div>
              )}
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100 py-2"
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

export default NewPassword;
