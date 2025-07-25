import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { joinClassAsyncThunk } from "../features/class/ClassSlice";
import { toast } from "react-toastify";

const InviteStudent = () => {
  const { code } = useParams();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handleInviteJoinClass = async () => {
    const joinClassToast = toast.loading("Joining Class....");
    const values = {
      code,
      userId: user._id,
    };

    const result = await dispatch(joinClassAsyncThunk(values));
    if (joinClassAsyncThunk.fulfilled(result)) {
      toast.update(joinClassToast, {
        render: "Joined Class Successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
      navigate("/home");
    } else {
      const errorMessage = result.payload?.message || "Failed to join class..";
      toast.update(joinClassToast, {
        render: "Failed to join class..",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src="https://img.freepik.com/premium-vector/human-daily-activity-concept-vector-illustration_1287271-63525.jpg?w=740"
          alt="Invite"
          style={styles.image}
        />
        <h1 style={styles.title}>Join Our Class</h1>
        <p style={styles.subtitle}>You've been invited to join a classroom.</p>
        <p style={styles.codeLabel}>
          <strong>Invite Code:</strong> <span style={styles.code}>{code}</span>
        </p>
        <button
          onClick={handleInviteJoinClass}
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
    maxWidth: "400px",
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
  codeLabel: {
    fontSize: "1rem",
    color: "#444",
    marginBottom: "1.5rem",
  },
  code: {
    color: "#007bff",
    fontWeight: "bold",
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
  },
};

export default InviteStudent;
