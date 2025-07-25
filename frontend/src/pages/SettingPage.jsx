import React from "react";
import "../assets/css/homePage.css";
import { Link } from "react-router-dom";
import Navbar from "../component/layout/Navbar";
import Sidebar from "../component/layout/Sidebar";
import SidebarDesk from "../component/layout/SidebarDesk";
const SettingPage = () => {
  const styles = {
    heading: {
      fontSize: "20px",
      fontWeight: "600",
      color: "whites",
    },
    formGroup: {
      height: "62px",
      marginBottom: "1px",
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#555",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      outline: "none",
      transition: "border-color 0.2s",
    },
    inputFocus: {
      borderColor: "#007bff",
      boxShadow: "0 0 4px rgba(0, 123, 255, 0.3)",
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    },
    cancelButton: {
      padding: "8px 16px",
      backgroundColor: "#f0f0f0",
      color: "#555",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    cancelButtonHover: {
      backgroundColor: "#e0e0e0",
    },
    createButton: {
      padding: "8px 16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    createButtonHover: {
      backgroundColor: "#0056b3",
    },
    required: {
      color: "red",
    },
  };

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
      backgroundColor: "#e0e0e0",
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
                    <h2>Notifications</h2>
                    <h5>Email</h5>
                    <p>
                      These settings apply to the notifications you get by
                      email. <a href="#">Learn more</a>
                    </p>
                    <div style={settingStyle.toggleSwitch}>
                      <label>Allow email notifications</label>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="emailNotifications"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <h5>Comments</h5>
                    {[
                      "Comments on your posts",
                      "Comments that mention you",
                      "Private comments on work",
                    ].map((label, index) => (
                      <div style={settingStyle.toggleSwitch} key={index}>
                        <label>{label}</label>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </div>
                    ))}

                    <h5>Classes you teach</h5>
                    {[
                      "Late submissions of student work",
                      "Resubmissions of student work",
                      "Invitations to co-teach classes",
                      "Scheduled post published or failed",
                    ].map((label, index) => (
                      <div style={settingStyle.toggleSwitch} key={index}>
                        <label>{label}</label>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={settingStyle.card1}>
                    <h5>Class notifications</h5>
                    <p>
                      These settings apply to both your email and device
                      notifications for each class
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

export default SettingPage;
