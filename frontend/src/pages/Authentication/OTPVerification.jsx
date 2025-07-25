import React, { useState, useEffect } from "react";
import "../../assets/css/otpVerification.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OTPVerification = () => {
useLocation
const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email =  params.get("email");

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    localStorage.getItem("otpExpireTime")
      ? Math.max(0, Math.floor((localStorage.getItem("otpExpireTime") - Date.now()) / 1000))
      : 60
  );
  const [canResend, setCanResend] = useState(timeLeft === 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanResend(true);
            localStorage.removeItem("otpExpireTime");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtp(value.slice(0, 6));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp === "") {
      toast.error("The OTP is required");
    } else if (otp.length < 6) {
      toast.error("The OTP must be at least 6 digits");
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/otp-verification`,
          { otp }
        );
        if (response.data.success) {
          toast.success(response.data.message);
          navigate(`/new-password?email=${response.data.email}`);

        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/resend-otp` , {email : email} );
      toast.success("OTP resent successfully!");
      setTimeLeft(60);
      setCanResend(false);
      localStorage.setItem("otpExpireTime", Date.now() + 120 * 1000);
    } catch (error) {
      toast.error("Failed  resend OTP. Try again later.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "white", marginTop: "18px", border: "none" }}>
      <div className="card p-4" style={{ width: "350px", marginTop: "-62px", border: "none" }}>
        <div className="text-center mb-4">
          <DotLottieReact src="https://lottie.host/136e0148-c03f-4508-8b5f-b6f20150f88e/mHOElaCxDs.lottie" loop autoplay className="img-fluid mb-3" />
          <h4 className="fw-bold">Verification</h4>
          <p className="text-muted">You will get an OTP via Email</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="otp-container mb-4">
            <input
              type="text"
              className="form-control otp-input"
              value={otp}
              placeholder="X X X X X X"
              onChange={handleChange}
              maxLength="6"
              style={{ textAlign: "center", fontSize: "1.5rem", letterSpacing: "10px", borderRadius: "10px" }}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2" style={{ backgroundColor: "#6f42c1", border: "none", borderRadius: "10px" }}>VERIFY</button>
        </form>
        <div className="text-center mt-4">
          <p className="text-muted small">
            Didn’t receive the OTP? {" "}
            <button
              onClick={handleResendOTP}
              className="btn btn-link p-0 fw-bold"
              disabled={!canResend}
            >
              {canResend ? "Resend again" : `Resend in ${timeLeft}s`}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
