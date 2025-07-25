import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  getBannerClassImages,
  setClassBanerAsynThunk,
  uploadCustomeBannerAsyncThunk,
} from "../../features/class/ClassSlice";
import { useDispatch } from "react-redux";
import { ImRadioChecked2 } from "react-icons/im";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
const Stream = ({ ClassData, fetchSingleClass }) => {
  console.log(ClassData);
  const styles = {
    headerImage: {
      backgroundImage: `url(${
        ClassData.bannerImage
          ? ClassData.bannerImage?.imagePath[0]?.url
          : "https://static.vecteezy.com/system/resources/previews/024/268/943/non_2x/group-of-people-holding-books-and-standing-in-a-row-students-studying-and-preparing-for-examination-vector.jpg"
      })`,
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

  const Codestyles = {
    code: {
      fontSize: "72px",
      color: "#3c4043",
      margin: "20px 0",
      textAlign: "center",
    },
    footer: {
      fontSize: "14px",
      color: "#5f6368",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    link: {
      color: "#1a73e8",
      textDecoration: "none",
    },
    closeIcon: {
      position: "absolute",
      top: "10px",
      right: "10px",
      fontSize: "18px",
      cursor: "pointer",
    },
    container: { width: "300px", margin: "20px auto", fontFamily: "Arial" },
    uploadBox: {
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "8px",
      marginTop: "10px",
    },
    preview: {
      maxWidth: "40px",
      marginRight: "10px",
      verticalAlign: "middle",
    },
    fileInfo: {
      display: "inline-block",
      verticalAlign: "middle",
    },
    progressBar: {
      height: "6px",
      width: "100%",
      background: "#eee",
      borderRadius: "5px",
      marginTop: "8px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      background: "#4caf50",
      transition: "width 0.2s",
    },
  };
  const [codePopUp, setCodePop] = useState(false);
  const [activeTab, setActiveTab] = useState("General");
  const [isDragging, setIsDragging] = useState(false);
  const [PreviewURL, setPreviewURL] = useState("");
  const [isUploading, setisUploading] = useState(false);
  const [BannerImages, setBannerImages] = useState(false);
  const [isLoadingBaner, setisLoadingBaner] = useState(false);
  const [bannerImageId, setbannerImageId] = useState("");
  const fileRef = useRef(null);
  const CloseUploadImageModalRef = useRef(null);
  const SelectClassThemeModalOpen = useRef(null);
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedImageIndex, setselectedImageIndex] = useState("");
  const [hoveredImageIndex, sethoveredImageIndex] = useState(null);
  const [selectedClassThemeImage, setselectedClassThemeImage] = useState({});
  const CloseSelectClassThemeModalRef = useRef(null);
  const getTimeLeft = () => {
    const seconds = Math.ceil((100 - progress) / 5) * 0.2; // Estimate time
    return `${seconds.toFixed(1)} seconds left`;
  };

  // ~~ Handle Code Popup ~~ //
  const toggleCodePopUp = () => setCodePop(!codePopUp);
  const inviteLink = `${import.meta.env.VITE_VIEW_BASE_URL}/invite-student/${
    ClassData.code
  }`;

  // ~~ Handle Copy Code Logic  ~~ //
  const handleCopy = () => {
    toast.success("Link Coopied...");
    navigator.clipboard.writeText(inviteLink);
  };
  // ~~ Handle File Input Open Logic  ~~ //
  const handleOpenFileInput = () => {
    fileRef.current.click();
  };

  // ~~ Handle Baner Upload Logic ~~ //
  const handleBanerUpload = (event) => {
    const file = event.target.files[0];
    BannerUploading(file);
  };
  // ~~ Handle Baner Upload Drage File Over Logic ~~ //
  const handleDragFileOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };
  // ~~ Handle Baner Upload Drage File Leave Logic ~~ //
  const handleDragFileLeave = () => {
    setIsDragging(false);
  };
  // ~~ Handle Baner Upload Drage File Leave Logic ~~ //
  const handleDragFile = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    BannerUploading(file);
  };

  // ~~ Banner Uploading Function  ~~ //
  const BannerUploading = async (file) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setProgress(0);
    setUploading(true);
    setisUploading(true);
    setPreviewURL(URL.createObjectURL(file));

    // Start simulated progress (up to 90%)
    let currentProgress = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 94) {
          return prev; // Don't go beyond 90 until upload finishes
        }
        currentProgress = prev + 5;
        return currentProgress;
      });
    }, 200);

    // Prepare FormData and start upload
    const formData = new FormData();
    formData.append("banner", file);
    formData.append("classId", ClassData._id);
    const result = await dispatch(uploadCustomeBannerAsyncThunk(formData));
    clearInterval(interval); // Stop simulated progress updates
    if (uploadCustomeBannerAsyncThunk.fulfilled.match(result)) {
      setProgress(100); // Jump to 100% on success
      toast.success(result.payload?.message);
      fetchSingleClass();
      CloseUploadImageModalRef.current.click();
      setPreviewURL("");
    } else {
      const errorMessage = result.payload?.message || "Something went wrong";
      toast.error(errorMessage);
    }

    setUploading(false);
    setisUploading(false);
  };
  const handleGetBanners = async (category) => {
    setisLoadingBaner(true);
    const result = await dispatch(getBannerClassImages(category));
    if (getBannerClassImages.fulfilled(result)) {
      setBannerImages(result.payload.data);
      setisLoadingBaner(false);
    } else {
      toast.error(result?.payload?.message);
    }
  };

  // ~~ Handle Selected Image Functionality  ~~ //
  const handleSelectImage = (index) => {
    setselectedImageIndex(index);
  };

  const handleSelectClassTheme = async () => {
    const result = await dispatch(
      setClassBanerAsynThunk(selectedClassThemeImage)
    );
    if (setClassBanerAsynThunk.fulfilled(result)) {
      fetchSingleClass();
      CloseSelectClassThemeModalRef.current.click();
    } else {
    }
  };

  return (
    <>
      <div style={styles.headerImage}>
        <h1
          style={{
            position: "absolute",
            bottom: "10px",
            left: "20px",
            color: "white",
            fontSize: "25px",
            fontWeight: "bold",
            zIndex: 2,
            textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
          }}
        >
          {ClassData.className}
        </h1>
        <button
          className="btn btn-light"
          data-bs-toggle="modal"
          data-bs-target="#CustomizeModal"
          style={{ ...styles.customizeBtn, zIndex: 3 }}
        >
          Customize
        </button>
      </div>

      <div className="row mt-4">
        <div className="col-md-3">
          <div style={styles.card}>
            <h6>Class code</h6>
            <div className="d-flex align-items-center">
              <span style={styles.code}>{ClassData.code}</span>
              <i className="fas fa-expand ms-2" onClick={toggleCodePopUp}></i>
            </div>
          </div>
          <div style={styles.card}>
            <h6>Upcoming</h6>
            <p>No work due soon</p>
            <a href="#">View all</a>
          </div>
        </div>

        <div className="col-md-9">
          <div style={{ ...styles.card, marginBottom: "16px" }}>
            <div className="d-flex align-items-center">
              <div className="me-3">
                <img
                  src={`${ClassData.teacher?.profile?.url}`}
                  alt="Profile picture of teacher"
                  height="40"
                  width="40"
                  style={styles.memberImage}
                  className="rounded-circle"
                />
              </div>
              <input
                type="text"
                placeholder="Announce something to your class"
                style={styles.announcementInput}
              />
            </div>
          </div>

          <div style={styles.card}>
            <div className="d-flex align-items-center mb-3">
              <img
                src="https://static.vecteezy.com/system/resources/previews/005/416/084/non_2x/world-book-day-background-with-fiction-elements-free-vector.jpg"
                alt="Decorative image with various school supplies"
                style={styles.streamImage}
              />
              <div className="ms-3">
                <h5>This is where you can talk to your class</h5>
                <p>
                  Use the stream to share announcements, post assignments, and
                  respond to student questions
                </p>
              </div>
            </div>
            <button
              onClick={() => handleNativeShare()}
              className="btn btn-light"
            >
              Stream settings
            </button>
          </div>
        </div>
      </div>

      {/* Code Pop Up Modal */}
      {codePopUp && <div className="modal-backdrop fade show"></div>}
      <div
        className={`modal fade ${codePopUp ? "show" : ""}`}
        style={{ display: codePopUp ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div style={Codestyles.closeIcon} onClick={toggleCodePopUp}>
                &times;
              </div>
              <div style={{ textAlign: "center" }}>Class code</div>
              <div style={Codestyles.code}>{ClassData.code}</div>
              <div style={Codestyles.footer}>
                <div>{ClassData.className}</div>
                <div>
                  <a
                    className="icon-link icon-link-hover"
                    style={{
                      "--bs-icon-link-transform": "translate3d(0, -.125rem, 0)",
                    }}
                    onClick={handleCopy}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="bi"
                      viewBox="0 0 16 16"
                      aria-hidden="true"
                    >
                      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                    </svg>
                    Copy Invite link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Customize Appereance Modal */}
      <div>
        {/* First Modal */}
        <div
          className="modal fade"
          id="CustomizeModal"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex={-1}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "800px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  Customize Apperence
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {/* Header image */}
                <div
                  className="mb-4 rounded overflow-hidden"
                  style={{ maxHeight: "160px" }}
                >
                  <img
                    alt="Stream header image with laptop and mobile devices illustration on blue-gray background"
                    className="img-fluid w-100"
                    height="160"
                    width="720"
                    src={`${
                      ClassData.bannerImage
                        ? ClassData.bannerImage?.imagePath[0]?.url
                        : "https://static.vecteezy.com/system/resources/previews/024/268/943/non_2x/group-of-people-holding-books-and-standing-in-a-row-students-studying-and-preparing-for-examination-vector.jpg"
                    }`}
                  />
                </div>

                {/* Photo selector */}
                <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between mb-4">
                  <p className="small fw-semibold mb-3 mb-sm-0">
                    Select stream header image
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-light d-flex align-items-center gap-2"
                      type="button"
                      data-bs-target="#selectPhotoModal"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                      ref={SelectClassThemeModalOpen}
                      onClick={() => handleGetBanners("general")}
                    >
                      <i className="far fa-image"></i> Select photo
                    </button>

                    <button
                      className="btn btn-sm btn-light d-flex align-items-center gap-2"
                      type="button"
                      data-bs-target="#uploadPhotoModal"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                    >
                      <i className="fas fa-upload"></i> Upload photo
                    </button>
                  </div>
                </div>

                {/* Theme color options */}
                <p className="small fw-semibold mb-3">Select theme color</p>
                <div className="d-flex gap-3 flex-wrap">
                  {[
                    "#1e56d6",
                    "#1f7a2e",
                    "#e61f7a",
                    "#e5720a",
                    "#1f8a96",
                    "#7a2ee6",
                    "#4a7ae6",
                    "#5a5a5a",
                  ].map((color, index) => (
                    <button
                      key={index}
                      aria-label="Theme color"
                      className={`btn p-0 rounded-circle d-flex justify-content-center align-items-center ${
                        index === 1 ? "theme-selected" : ""
                      }`}
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: color,
                      }}
                      type="button"
                    >
                      {index === 1 && (
                        <i className="fas fa-check text-white fs-5"></i>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  data-bs-target="#CustomizeModal"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
        {/* Second Modal */}
        <div
          className="modal fade"
          id="selectPhotoModal"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex={-1}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "800px" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel2">
                  Select class theme
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={CloseSelectClassThemeModalRef}
                  onClick={() => setActiveTab("General")}
                />
              </div>
              <div className="modal-body">
                <p className="mb-3 small"></p>
                <ul className="nav nav-tabs mb-3 small">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "General" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("General");
                        handleGetBanners("general");
                      }}
                    >
                      General
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "English & History" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("English & History");
                        handleGetBanners("english&history");
                      }}
                    >
                      English & History
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "Math & Science" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("Math & Science");
                        handleGetBanners("math&sci");
                      }}
                    >
                      Math & Science
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "Arts" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("Arts");
                        handleGetBanners("arts");
                      }}
                    >
                      Arts
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "Sports" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("Sports");
                        handleGetBanners("sports");
                      }}
                    >
                      Sports
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "Other" ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveTab("Other");
                        handleGetBanners("others");
                      }}
                    >
                      Other
                    </button>
                  </li>
                </ul>

                <div className="row g-2">
                  {isLoadingBaner ? (
                    <div class="text-center">
                      <div class="spinner-grow text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : Array.isArray(BannerImages) && BannerImages.length > 0 ? (
                    BannerImages.map((banner, idx) => (
                      <div className="col-12 col-sm-6 col-md-3" key={idx}>
                        {banner.imagePath.length > 0 && (
                          <div
                            key={idx}
                            style={{
                              position: "relative",
                              display: "inline-block",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              handleSelectImage(idx);
                              setselectedClassThemeImage({
                                bannerId: banner._id,
                                classId: ClassData._id,
                              });
                            }}
                            onMouseOver={() => sethoveredImageIndex(idx)}
                            onMouseLeave={() => sethoveredImageIndex(null)}
                          >
                            <img
                              src={banner.imagePath[0].url}
                              alt={`Banner ${idx}`}
                              className={`theme-img ${
                                selectedImageIndex === idx
                                  ? "border border-success border-3"
                                  : ""
                              }`}
                              onClick={() => setbannerImageId(banner._id)}
                              style={{
                                width: 150,
                                height: 100,
                                objectFit: "cover",
                                borderRadius: 8,
                                filter:
                                  hoveredImageIndex === idx
                                    ? "brightness(90%)"
                                    : "none",
                                border:
                                  hoveredImageIndex === idx
                                    ? "2px solid #0d6efd"
                                    : undefined,
                                transition: "all 0.3s ease",
                              }}
                            />
                            {hoveredImageIndex === idx && (
                              <MdOutlineRadioButtonUnchecked
                                style={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  color:
                                    hoveredImageIndex === idx
                                      ? "#0d6efd"
                                      : "green",
                                  fontSize: 24,
                                }}
                              />
                            )}
                            {selectedImageIndex === idx && (
                              <MdOutlineRadioButtonChecked
                                style={{
                                  position: "absolute",
                                  top: 8,
                                  right: 8,
                                  color:
                                    hoveredImageIndex === idx
                                      ? "#0d6efd"
                                      : "green",
                                  fontSize: 24,
                                }}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>No Images</div>
                  )}
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <style>{`
        .nav-tabs .nav-link.active {
          border-bottom: 2px solid #0d6efd;
          color:rgb(0, 0, 0);
          font-weight: 500;
        }
        .theme-img {
          border-radius: 0.375rem;
          object-fit: cover;
          width: 100%;
          height: 100px;
        }
        .nav-tabs .nav-link:hover {
  background-color: #f8f9fa; /* light gray background */
  color: #0d6efd;            /* Bootstrap primary blue */
}
      `}</style>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  data-bs-target="#CustomizeModal"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  onClick={() => setActiveTab("General")}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSelectClassTheme(BannerImages[0]._id);
                  }}
                  className="btn btn-primary"
                  type="button"
                >
                  Select Class Theme
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Third Modal */}
        <div
          className="modal fade"
          id="uploadPhotoModal"
          aria-hidden="true"
          aria-labelledby="uploadPhotoModalLabel"
          tabIndex={-1}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ maxWidth: "800px" }}
          >
            <div className="modal-content border-0 shadow-sm">
              <div className="modal-header border-0">
                <h5
                  className="modal-title fw-semibold"
                  id="uploadPhotoModalLabel"
                >
                  Upload a Photo
                </h5>
                <button
                  type="button"
                  ref={CloseUploadImageModalRef}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body p-4">
                {PreviewURL ? (
                  <>
                    <div
                      className="d-flex align-items-center shadow-sm"
                      style={{
                        maxWidth: "500px",
                        margin: "40px auto",
                        border: "1px solid #dee2e6",
                        borderRadius: "8px",
                        padding: "16px",
                        gap: "16px",
                      }}
                    >
                      {/* File Icon */}
                      <div style={{ fontSize: "32px", color: "green" }}>
                        <img
                          height="50"
                          width="50"
                          src={`${preview}`}
                          alt="okk"
                        />
                      </div>

                      {/* File Details */}
                      <div style={{ flexGrow: 1 }}>
                        <div className="fw-semibold">{file.name}</div>
                        <div style={{ fontSize: "0.875rem", color: "gray" }}>
                          {(file.size / 1024).toFixed(1)}KB • {getTimeLeft()}
                        </div>

                        {/* Progress Bar */}
                        <div
                          className="progress mt-2"
                          style={{ height: "6px" }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${progress}%` }}
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          />
                        </div>
                      </div>

                      {/* Percentage */}
                      <div style={{ color: "gray" }}>{progress}%</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onDragOver={handleDragFileOver}
                      onDragLeave={handleDragFileLeave}
                      onDrop={handleDragFile}
                      className={`d-flex flex-column justify-content-center align-items-center text-center p-5 ${
                        isDragging ? "bg-light border border-primary" : ""
                      }`}
                      style={{
                        height: "400px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <img
                        src="/assets/images/upload1.png"
                        alt="Cloud upload"
                        width="140"
                        height="130"
                        className="mb-4"
                        style={{ pointerEvents: "none", userSelect: "none" }}
                      />
                      <button
                        type="button"
                        className="btn btn-primary px-4 py-2 fw-semibold"
                        style={{
                          fontSize: "0.875rem",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                          borderRadius: "999px", // pill shape
                        }}
                        onClick={handleOpenFileInput}
                      >
                        Browse
                      </button>
                      <input
                        ref={fileRef}
                        onChange={handleBanerUpload}
                        style={{ display: "none" }}
                        type="file"
                        name="file"
                      />
                      <p
                        className="text-muted mt-3 mb-0"
                        style={{ fontSize: "0.875rem" }}
                      >
                        or drag a photo here
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stream;
