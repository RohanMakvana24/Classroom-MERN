import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from "../../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import CreateClassSchema from "../../ValidationSchema/Class/createClassSchema";
import {
  createNewClass,
  getAllNotificationAsynkThunk,
  joinClassAsyncThunk,
} from "../../features/class/ClassSlice";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { showBrowserNotification } from "../../utils/notifyUser";
dayjs.extend(relativeTime);
const Navbar = ({ fetchClass, Notifications }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const createClassModelCloseRef = useRef(null);
  const joinClassModalCloseRef = useRef(null);
  const qrUploadFileInput = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [isScanning, setIsScanning] = useState(false);
  const [notifications, setnotications] = useState([]);
  useEffect(() => {
    const qrInstance = new Html5Qrcode("reader");
    html5QrCodeRef.current = qrInstance;

    return () => {
      const qrCode = html5QrCodeRef.current;
      if (!qrCode) return;

      const state = qrCode.getState?.();
      const isScanning = state === Html5QrcodeScannerState.SCANNING;

      if (isScanning) {
        qrCode
          .stop()
          .then(() => qrCode.clear())
          .catch((err) => {
            console.warn("Cleanup failed during stop:", err);
          });
      } else {
        // qrCode.clear().catch((err) => {
        //   console.warn("Cleanup failed during clear:", err);
        // });
      }
    };
  }, []);

  const handleLogout = async () => {
    const logoutToast = toast.loading("Logout Processing...");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/auth/private-auth`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.isValid && response.data.success) {
        dispatch(logout());
        localStorage.removeItem("auth");
        toast.update(logoutToast, {
          render: "Logout Succefull",
          type: "success",
          theme: "colored",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.update(logoutToast, {
        render: "Somenthing Went Wrong",
        type: "error",
        theme: "colored",
        loading: false,
        autoClose: 3000,
      });
    }
  };

  // ~~ Create Class Formik ~~ //
  const createClassFormik = useFormik({
    initialValues: {
      className: "",
      section: "",
      subject: "",
      room: "",
      userId: "",
    },
    validationSchema: CreateClassSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("className", values.className);
      formData.append("section", values.section);
      formData.append("subject", values.subject);
      formData.append("room", values.room);
      formData.append("userId", user._id);
      const classToastId = toast.loading("Class is Creating....");
      const result = await dispatch(createNewClass(formData));
      if (createNewClass.fulfilled.match(result)) {
        toast.update(classToastId, {
          render: result.payload.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        dispatch(updateUser(result.payload?.User));
        fetchClass();
        resetForm();
        createClassModelCloseRef.current.click();
      } else {
        const errorData = result.payload?.errors;
        if (errorData) {
          const errorMessage = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n");

          toast.update(classToastId, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(classToastId, {
            render: "Somenthing Went Wrong",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      }
    },
  });

  // ~~ Join Class Formik ~~ //
  const joinClassFormik = useFormik({
    initialValues: {
      code: "",
      userId: "",
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .matches(
          /^[a-zA-Z0-9]{7}$/,
          "Code must be a 7-character alphanumeric string"
        )
        .required("Class code is required"),
    }),
    onSubmit: async (values) => {
      const joinClassToast = toast.loading("Joining Class...");
      values.userId = user._id;

      try {
        const result = await dispatch(joinClassAsyncThunk(values));
        if (joinClassAsyncThunk.fulfilled.match(result)) {
          toast.update(joinClassToast, {
            render: "Joined Class Successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
          });
          joinClassModalCloseRef.current.click();
          fetchClass();
        } else {
          const errorMessage =
            result.payload?.message || "Failed to join class";
          toast.update(joinClassToast, {
            render: errorMessage,
            type: "error",
            isLoading: false,
            autoClose: 3000,
            closeButton: true,
          });
        }
      } catch (err) {
        // Catch any unexpected errors (network, etc.)
        toast.update(joinClassToast, {
          render: "Something went wrong!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
      }
    },
  });

  // ~~ Function : Join Class Using QR ~~ //
  const joinClass = async (values) => {
    const joinClassToast = toast.loading("Joining Class...");
    try {
      const result = await dispatch(joinClassAsyncThunk(values));
      if (joinClassAsyncThunk.fulfilled.match(result)) {
        toast.update(joinClassToast, {
          render: "Joined Class Successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
        joinClassModalCloseRef.current.click();
        fetchClass();
      } else {
        const errorMessage = result.payload?.message || "Failed to join class";
        toast.update(joinClassToast, {
          render: errorMessage,
          type: "error",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
        });
      }
    } catch (err) {
      // Catch any unexpected errors (network, etc.)
      toast.update(joinClassToast, {
        render: "Something went wrong!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeButton: true,
      });
    }
  };

  // ~~ Handle QRCode Uploader And Join ~~ //
  const handleQRUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      alert("Invalid Image");
      return;
    }
    try {
      const decodedCode = await html5QrCodeRef.current.scanFile(file, true);
      const values = {
        userId: user._id,
        code: decodedCode,
      };
      joinClass(values);
    } catch (err) {
      console.log(err);
    }
  };

  const startScanning = async () => {
    alert("Initializing camera...");
    setIsScanning(true);
    try {
      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length > 0) {
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedCode) => {
            const values = {
              userId: user._id,
              code: decodedCode,
            };
            joinClass(values);
            html5QrCodeRef.current.stop().then(() => {
              setIsScanning(false);
            });
          }
        );
      } else {
        alert("No cameras found.");
        setIsScanning(false);
      }
    } catch (err) {
      alert(`Camera access error: ${err}`);
      setIsScanning(false);
    }
  };

  // "`` Get All Notifications ``" //

  const getAllNotifications = async () => {
    const response = await dispatch(getAllNotificationAsynkThunk(user._id));
    const data = response.payload?.notifications;
    setnotications(data);
    data.forEach((n) => {
      if (!n.show) {
        showBrowserNotification({ message: n.message });
        handleMarkShowNotification(n._id);
      }
    });
  };

  useEffect(() => {
    getAllNotifications();
    const interval = setInterval(getAllNotifications, 30000);
    return () => clearInterval(interval);
  });

  const handleMarkShowNotification = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3520/api/v1/class/notification/mark-show/${id}`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <button
            className="btn btn-outline-primary btn-sm d-lg-none me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
          >
            <i className="fas fa-bars"></i>
          </button>

          <Link
            to="/home"
            className="navbar-brand"
            href="#"
            style={{ fontWeight: "600" }}
          >
            <i
              className="fa-solid fa-book"
              style={{ marginRight: "6px", fontSize: "19px" }}
            ></i>
            Classroom
          </Link>
          <div className="d-flex align-items-center ms-auto">
            <div className="dropdown">
              <button className="btn btn-link" data-bs-toggle="dropdown">
                <i className="fas fa-plus" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#createClassModal"
                  >
                    Create Class
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#joinClassModal"
                  >
                    Join Class
                  </button>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                data-bs-toggle="dropdown"
                className="btn btn-link position-relative p-0"
              >
                <i className="fa-solid fa-bell fa-lg"></i>
                {notifications.length > 0 ? (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {notifications.length || 0}
                    <span className="visually-hidden">
                      unread notifications
                    </span>
                  </span>
                ) : (
                  ""
                )}
              </button>
              <div
                className="dropdown-menu dropdown-menu-end p-0 shadow"
                style={{
                  minWidth: "380px",
                  maxHeight: "450px",
                  overflowY: "auto",
                }}
              >
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
                  <h6 className="mb-0">Notifications</h6>
                  <button className="btn btn-link btn-sm text-success p-0">
                    Mark all as read
                  </button>
                </div>

                {/* Group Label */}
                <div className="px-3 pt-2 text-muted small fw-semibold">
                  Today
                </div>

                <div className="list-group list-group-flush">
                  {notifications.map((notify, idx) => {
                    const formattedTime = dayjs(notify.createdAt).fromNow();
                    return (
                      <div
                        key={idx}
                        className={`list-group-item d-flex align-items-start gap-2 ${
                          notify.status === "success" ? "bg-light-success" : ""
                        }`}
                      >
                        {/* Icon */}
                        <div className="pt-1">
                          {notify.user?.profile?.url && (
                            <img
                              src={notify.user.profile.url}
                              alt="avatar"
                              className="rounded-circle"
                              width="36"
                              height="36"
                              referrerPolicy="no-referrer"
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <strong>
                              {notify.title || notify.user?.fullname}
                            </strong>
                            <span className="small text-muted">
                              {formattedTime}
                            </span>
                          </div>
                          <div className="small text-muted">
                            {notify.message}
                          </div>
                          {notify.actions && (
                            <div className="mt-2 d-flex gap-2">
                              <button className="btn btn-sm btn-primary w-50">
                                Accept
                              </button>
                              <button className="btn btn-sm btn-outline-secondary w-50">
                                Decline
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Footer */}
                <div className="text-center border-top p-2">
                  <button className="btn btn-link btn-sm">
                    View all notifications
                  </button>
                </div>
              </div>
            </div>

            <div className="dropdown">
              <button
                className="btn btn-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <img
                  alt="User profile"
                  className="rounded-circle"
                  height="32"
                  src={
                    user.profile?.url ||
                    "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_w.jpeg"
                  }
                  width="32"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Create Class Modal */}
      <div
        className="modal fade"
        id="createClassModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={createClassFormik.handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Create Class</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  ref={createClassModelCloseRef}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">
                    Class Name{" "}
                    <span style={{ color: "red" }}> (required) </span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      createClassFormik.touched.className &&
                      createClassFormik.errors.className
                        ? "is-invalid"
                        : ""
                    }`}
                    name="className"
                    value={createClassFormik.values.className}
                    onChange={createClassFormik.handleChange}
                    onBlur={createClassFormik.handleBlur}
                  />
                  {createClassFormik.touched.className &&
                    createClassFormik.errors.className && (
                      <div className="text-danger">
                        {createClassFormik.errors.className}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Section</label>
                  <input
                    type="text"
                    name="section"
                    className={`form-control ${
                      createClassFormik.touched.section &&
                      createClassFormik.errors.section
                        ? "is-invalid"
                        : ""
                    }`}
                    value={createClassFormik.values.section}
                    onChange={createClassFormik.handleChange}
                    onBlur={createClassFormik.handleBlur}
                  />
                  {createClassFormik.touched.section &&
                    createClassFormik.errors.section && (
                      <div className="text-danger">
                        {createClassFormik.errors.section}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className={`form-control ${
                      createClassFormik.touched.subject &&
                      createClassFormik.errors.subject
                        ? "is-invalid"
                        : ""
                    }`}
                    name="subject"
                    value={createClassFormik.values.subject}
                    onChange={createClassFormik.handleChange}
                    onBlur={createClassFormik.handleBlur}
                  />
                  {createClassFormik.touched.subject &&
                    createClassFormik.errors.subject && (
                      <div className="text-danger">
                        {createClassFormik.errors.subject}
                      </div>
                    )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Room</label>
                  <input
                    type="text"
                    className={`form-control ${
                      createClassFormik.touched.room &&
                      createClassFormik.errors.room
                        ? "is-invalid"
                        : ""
                    }`}
                    name="room"
                    value={createClassFormik.values.room}
                    onChange={createClassFormik.handleChange}
                    onBlur={createClassFormik.handleBlur}
                  />
                  {createClassFormik.touched.room &&
                    createClassFormik.errors.room && (
                      <div className="text-danger">
                        {createClassFormik.errors.room}
                      </div>
                    )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Join Class Modal */}
      <div
        className="modal fade"
        id="joinClassModal"
        tabIndex={-1}
        aria-labelledby="joinClassModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={joinClassFormik.handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="joinClassModalLabel">
                  Join class
                </h5>
                <button
                  ref={joinClassModalCloseRef}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body px-4 py-3">
                {/* Account Info */}
                <div id="reader" />

                <div className="border rounded p-3 mb-3">
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    <button
                      className="btn text-white"
                      type="button"
                      onClick={startScanning}
                      disabled={isScanning}
                      style={{ backgroundColor: " #3f7fd0 " }}
                    >
                      <i className="fa-solid fa-qrcode me-2"></i>
                      {isScanning ? "Scanning..." : "Scan QR Code"}
                    </button>
                    <button
                      className="btn text-white"
                      type="button"
                      style={{ backgroundColor: " #a23bee " }}
                      onClick={() => {
                        qrUploadFileInput.current.click();
                      }}
                    >
                      <i className="fa-solid fa-upload me-2"></i>
                      Upload QR
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      ref={qrUploadFileInput}
                      onChange={handleQRUpload}
                    />
                  </div>
                </div>

                {/* Class Code Input */}
                <div className="border rounded p-3 mb-3">
                  <label
                    htmlFor="classCode"
                    className="form-label fw-semibold mb-1"
                  >
                    Class code
                  </label>
                  <div className="text-muted small mb-2">
                    Ask your teacher for the class code, then enter it here.
                  </div>
                  <input
                    type="text"
                    className={`form-control ${
                      joinClassFormik.touched.code &&
                      joinClassFormik.errors.code
                        ? "is-invalid"
                        : ""
                    }`}
                    id="code"
                    name="code"
                    value={joinClassFormik.values.code}
                    onChange={joinClassFormik.handleChange}
                    onBlur={joinClassFormik.handleBlur}
                    placeholder="Class code"
                  />
                  {joinClassFormik.touched.code &&
                    joinClassFormik.errors.code && (
                      <div className="text-danger">
                        {joinClassFormik.errors.code}
                      </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="text-muted small">
                  <ul className="mb-2 ps-3">
                    <li>Use an authorized account</li>
                    <li>
                      Use a class code with 5–8 letters or numbers, and no
                      spaces or symbols
                    </li>
                  </ul>
                  If you have trouble joining the class, go to the{" "}
                  <a href="#">Help Center article</a>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
