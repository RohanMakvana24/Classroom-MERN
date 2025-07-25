import React, { useEffect, useState } from "react";
import "../assets/css/homePage.css";
import Navbar from "../component/layout/Navbar";
import Sidebar from "../component/layout/Sidebar";
import ClassCard from "../component/ClassCard";
import ClassWork from "../component/class/ClassWork";
import People from "../component/class/People";
import Stream from "../component/class/Stream";
import SidebarDesk from "./../component/layout/SidebarDesk";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleClassThunk } from "../features/class/ClassSlice";
const OneClassPage = () => {
  const styles = {
    headerImage: {
      backgroundImage:
        'url("https://static.vecteezy.com/system/resources/previews/011/134/640/non_2x/development-illustration-vector.jpg")',
      backgroundSize: "cover", // Ensures the image covers the container
      backgroundPosition: "center", // Centers the image
      height: "200px",
      position: "relative",
    },

    headerImageImg: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "100%",
      height: "auto",
    },
    customizeBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
    },
    card: {
      backgroundColor: "#fff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px",
    },
    code: {
      fontSize: "24px",
      color: "#1a73e8",
    },
    announcementInput: {
      border: "none",
      outline: "none",
      width: "100%",
    },
    streamImage: {
      maxWidth: "10%",
      height: "auto",
    },
    badge: {
      width: "40px",
      height: "40px",
    },
  };

  const dispatch = useDispatch();
  const [ClassData, setClassData] = useState({});
  const user = useSelector((state) => state.auth.user);
  const [ActiveTab, setActiveTab] = useState(
    localStorage.getItem("activeTab")
      ? localStorage.getItem("activeTab")
      : "stream"
  );
  const HandleActiveTab = (types) => {
    setActiveTab(types);
    localStorage.setItem("activeTab", types);
  };

  // ~~ Class Id Get //
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const classId = param.get("classId");

  // ~~ Get Classs Details ~~ //
  const fetchSingleClass = async () => {
    const result = await dispatch(getSingleClassThunk(classId));
    if (getSingleClassThunk.fulfilled(result)) {
      setClassData(result.payload.data);
    } else {
      alert(result.payload?.message);
    }
  };
  useEffect(() => {
    fetchSingleClass();
  }, [classId]);

  const isTeacher = ClassData.teacher?._id.toString() === user._id.toString();
  const isSubTeacher = ClassData.subTeachers?.some(
    (id) => id.toString() === user._id.toString()
  );
  const isStudent = ClassData.allStudents?.some(
    (id) => id.toString() === user._id.toString()
  );
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
                <ul className="nav nav-tabs">
                  {isTeacher ? (
                    <>
                      <li className="nav-item">
                        <a
                          onClick={() => HandleActiveTab("stream")}
                          className={`nav-link ${
                            ActiveTab === "stream" ? "active" : ""
                          }`}
                          aria-current="page"
                        >
                          Stream
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          onClick={() => HandleActiveTab("classwork")}
                          className={`nav-link ${
                            ActiveTab === "classwork" ? "active" : ""
                          }`}
                        >
                          Classwork
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          onClick={() => HandleActiveTab("people")}
                          className={`nav-link ${
                            ActiveTab === "people" ? "active" : ""
                          }`}
                        >
                          People
                        </a>
                      </li>
                    </>
                  ) : isSubTeacher ? (
                    <>
                      <li className="nav-item">
                        <a
                          onClick={() => HandleActiveTab("stream")}
                          className={`nav-link ${
                            ActiveTab === "stream" ? "active" : ""
                          }`}
                          aria-current="page"
                        >
                          Stream
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          onClick={() => HandleActiveTab("classwork")}
                          className={`nav-link ${
                            ActiveTab === "classwork" ? "active" : ""
                          }`}
                        >
                          Classwork
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          onClick={() => HandleActiveTab("people")}
                          className={`nav-link ${
                            ActiveTab === "people" ? "active" : ""
                          }`}
                        >
                          People
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <a
                          onClick={() => HandleActiveTab("stream")}
                          className={`nav-link ${
                            ActiveTab === "stream" ? "active" : ""
                          }`}
                          aria-current="page"
                        >
                          Stream
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          onClick={() => HandleActiveTab("people")}
                          className={`nav-link ${
                            ActiveTab === "people" ? "active" : ""
                          }`}
                        >
                          People
                        </a>
                      </li>
                    </>
                  )}
                </ul>
                {ActiveTab === "stream" && (
                  <Stream
                    ClassData={ClassData}
                    fetchSingleClass={fetchSingleClass}
                  />
                )}
                {ActiveTab === "classwork" && <ClassWork />}
                {ActiveTab === "people" && <People ClassData={ClassData} />}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default OneClassPage;
