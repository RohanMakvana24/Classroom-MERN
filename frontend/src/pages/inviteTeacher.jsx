import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import inviteTeacherSchema from "../ValidationSchema/Class/inviteTeacherValidation";
import { useDispatch } from "react-redux";
import { InviteTeacherAddAsyncThunk } from "../features/class/ClassSlice";
import { toast } from "react-toastify";
import { logout } from "../features/auth/authSlice";
const InviteTeacherPage = () => {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  // `` Note : Formik to handle form of invite teacher `` //
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      code: code,
    },
    validationSchema: inviteTeacherSchema,
    onSubmit: async (values) => {
      const toastId = toast.loading("Adding teacher, please wait...");
      const result = await dispatch(InviteTeacherAddAsyncThunk(values));
      console.log(result);
      // if (InviteTeacherAddAsyncThunk.fulfilled.match(result)) {
      //   toast.update(toastId, {
      //     render: result.payload?.message,
      //     type: "success",
      //     isLoading: false,
      //     autoClose: 3000,
      //   });
      //   dispatch(logout());
      //   localStorage.removeItem("auth");
      //   navigate("/login");
      // } else {
      //   toast.update(toastId, {
      //     render: result.payload?.message || "Failed to add teacher.",
      //     type: "error",
      //     isLoading: false,
      //     autoClose: 3000,
      //     closeOnClick: true,
      //   });
      // }
    },
  });
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src="https://img.freepik.com/premium-vector/human-daily-activity-concept-vector-illustration_1287271-63525.jpg?w=740"
          alt="Invite"
          style={styles.image}
        />
        <h2 style={styles.title}>You're Invited to Teach!</h2>
        <p style={styles.subtitle}>
          Complete the form below to accept your invitation.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="name"
              name="name"
              className={`form-control ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              style={styles.input}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {formik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              style={styles.input}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {formik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${
                formik.touched.password && formik.errors.password
                  ? "is-invalid"
                  : ""
              }`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              style={styles.input}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {formik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "is-invalid"
                  : ""
              }`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              style={styles.input}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className="invalid-feedback" style={{ display: "block" }}>
                {formik.errors.confirmPassword}
              </div>
            ) : (
              ""
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Invite Code</label>
            <input
              type="text"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled
              style={{ ...styles.input, backgroundColor: "#e9ecef" }}
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              transform: hover ? "scale(1.05)" : "scale(1)",
              boxShadow: hover
                ? "0 8px 24px rgba(118, 75, 162, 0.6)"
                : "0 6px 20px rgba(118, 75, 162, 0.4)",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "1rem",
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  image: {
    width: "200px",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#333",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  formGroup: {
    textAlign: "left",
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    fontFamily: "inherit",
  },
  button: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    padding: "12px 28px",
    fontSize: "1rem",
    fontWeight: "600",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    marginTop: "1rem",
    width: "100%",
  },
};

export default InviteTeacherPage;
