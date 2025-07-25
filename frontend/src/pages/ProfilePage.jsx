import React, { useRef } from "react";
import "../assets/css/homePage.css";
import { Link } from "react-router-dom";
import Navbar from "../component/layout/Navbar";
import Sidebar from "../component/layout/Sidebar";
import SidebarDesk from "../component/layout/SidebarDesk";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import { updateUser } from "../features/auth/authSlice";
import { use } from "react";
const ProfilePage = () => {
  const settingStyle = {
    container1: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    card1: {
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
    },
    profilePicture: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "inline-block",
      textAlign: "center",
      lineHeight: "40px",
      fontSize: "20px",
      color: "white",
    },
    toggleSwitch: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
    },
    link: {
      marginLeft: "10px",
      textDecoration: "none",
      color: "blue",
    },
  };

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const handleButtonclick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const fromData = new FormData();
    fromData.append("profile", file);
    const toastId = toast.loading("Profile Uploading...");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/user/change-profile/${
          user._id
        }`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(updateUser(response.data.user));
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "Oops! Something went wrong. ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      if (error) {
        toast.update(toastId, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      } else {
        toast.update(toastId, {
          render: "Oops! Something went wrong. ❌",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <>
      <div className="mainOP">
        {/* Navbar */}
        <Navbar />

        {/* Offcanvas Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="container-fluid">
          <div className="row">
            <SidebarDesk />
            <main className="col-lg-10 ms-auto px-6">
              <div className="container-fluid mt-4">
                <div style={settingStyle.container1}>
                  <div style={settingStyle.card1}>
                    <h2>Profile</h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <img
                        style={settingStyle.profilePicture}
                        src={`${user.profile.url}`}
                      />
                      <a
                        onClick={handleButtonclick}
                        href="#"
                        style={settingStyle.link}
                      >
                        Change
                      </a>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        ref={fileInputRef}
                      />
                    </div>
                    <p>
                      <strong>Account settings</strong>
                      <br />
                      Change your password and security options, and access
                      other Google services.{" "}
                      <Link to="/setting">account settings </Link>
                    </p>
                    <p>
                      <strong>Change name</strong>
                      <br />
                      To change your name, go to your{" "}
                      <Link to="/setting">account settings</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
