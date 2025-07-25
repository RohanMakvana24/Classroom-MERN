import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import CreatableSelect from "react-select/creatable";
import YouTubePicker from "./AttachComponent/YoutubePicker";
const Material = (props) => {
  const styles = {
    body: {
      height: "100%",
      margin: 0,
      fontFamily: "sans-serif",
      backgroundColor: "#fff",
    },
    containerCenter: {
      minHeight: "calc(100vh - 56px)",
      padding: "2rem",
      textAlign: "center",
    },
    placeholderImage: {
      width: "150px",
      height: "120px",
      background: "#f5f5f5",
      borderRadius: "8px",
      margin: "0 auto 30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "50px",
    },
    searchBox: {
      maxWidth: "600px",
      margin: "0 auto 2rem",
    },
    formControl: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: "4px",
      border: "1px solid #ced4da",
      marginBottom: "10px",
    },
    searchButton: {
      padding: "0.5rem 1rem",
      background: "#e62117",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f8f9fa",
      padding: "0.5rem 1rem",
      borderBottom: "1px solid #ddd",
    },
    logo: {
      height: "30px",
    },
    closeBtn: {
      fontSize: "1.5rem",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1rem",
    },
    videoCard: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "transform 0.2s",
    },
    videoThumbnail: {
      width: "100%",
      height: "auto",
    },
    videoInfo: {
      padding: "0.5rem",
      textAlign: "left",
    },
    videoTitle: {
      fontSize: "14px",
      fontWeight: "600",
      margin: "0",
    },
  };

  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [YoutubeModal, setYoutubeModal] = useState(false);
  const clientId =
    "803425663870-q5de3lo3v3uvkd440l2qn7334epsqd03.apps.googleusercontent.com";
  const apiKey = "AIzaSyBNJhZ2Butvyj53AaUQfdIXnXTmLmE9HuE";
  const scope = "https://www.googleapis.com/auth/drive.readonly";

  const tokenClientRef = useRef(null);
  const accessTokenRef = useRef(null);

  // ~~ Uploading Files From Google Drive Section Start ~~ //

  function GoogleDrivePickerButton() {
    useEffect(() => {
      const gsiScript = document.createElement("script");
      gsiScript.src = "https://accounts.google.com/gsi/client";
      gsiScript.async = true;
      document.body.appendChild(gsiScript);

      const gapiScript = document.createElement("script");
      gapiScript.src = "https://apis.google.com/js/api.js";
      gapiScript.onload = initializeGapiClient;
      document.body.appendChild(gapiScript);
    }, []);
  }

  const initializeGapiClient = () => {
    window.gapi.load("client:picker", () => {
      tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scope,
        callback: (tokenResponse) => {
          accessTokenRef.current = tokenResponse.access_token;
          createPicker();
        },
      });
    });
  };

  const createPicker = () => {
    if (!accessTokenRef.current) return;

    const view = new window.google.picker.DocsView()
      .setIncludeFolders(true)
      .setSelectFolderEnabled(true);

    const picker = new window.google.picker.PickerBuilder()
      .addView(view)
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .setOAuthToken(accessTokenRef.current)
      .setDeveloperKey(apiKey)
      .setCallback(pickerCallback)
      .build();

    picker.setVisible(true);
    props.toggleMaterialModal();
  };

  const pickerCallback = (data) => {
    if (data.docs && data.docs.length > 0) {
      const selectedFiles = data.docs.map((doc) => ({
        id: doc.id,
        name: doc.name || doc.title,
        url: doc.url,
        mimeType: doc.mimeType,
        iconUrl: doc.iconUrl,
        thumbnailUrl: doc.thumbnails?.[0]?.url || doc.thumbnailUrl || null,
      }));
      props.OpenMaterialModal.current.click();
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const openPicker = () => {
    if (tokenClientRef.current) {
      tokenClientRef.current.requestAccessToken();
    } else {
      alert("Token client not ready");
    }
  };
  const getReadableFileType = (mimeType) => {
    const mimeTypes = {
      "application/vnd.google-apps.document": "Google Docs",
      "application/vnd.google-apps.spreadsheet": "Google Sheets",
      "application/vnd.google-apps.presentation": "Google Slides",
      "application/vnd.google-apps.form": "Google Forms",
      "application/vnd.google-apps.drawing": "Google Drawing",
      "application/vnd.google-apps.script": "Google Apps Script",
      "application/pdf": "PDF",
      "application/msword": "Microsoft Word",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        "Word Document (DOCX)",
      "application/vnd.ms-excel": "Microsoft Excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        "Excel Spreadsheet (XLSX)",
      "application/vnd.ms-powerpoint": "Microsoft PowerPoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        "PowerPoint Presentation (PPTX)",
    };

    return mimeTypes[mimeType] || mimeType; // fallback to raw MIME type
  };

  // ~~ Uploading Files From Google Drive Section End ~~ //
  const handleAttachFileUpload = (type) => {
    if (type === "Drive") {
      openPicker();
    } else if (type === "YouTube") {
      setYoutubeModal(true);
    }
  };

  // ~~ Handle Topic Creation Logic ~~ //
  const initialOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [topics, settopics] = useState(initialOptions);
  const [selectedTopic, setselectedTopic] = useState([]);

  const handleTopicChange = (newValue) => {
    setselectedTopic(newValue);
  };

  const handleCreateTopic = (inputValue) => {
    const newTopic = { value: inputValue.toLowerCase(), label: inputValue };
    settopics((prev) => [...prev, newTopic]);
    setselectedTopic((prev) => [...prev, newTopic]);
  };

  const items = [
    {
      label: "Drive",
      className: "ri-drive-fill",
    },
    {
      label: "YouTube",
      className: "ri-youtube-fill",
    },
    {
      label: "Upload",
      className: "ri-file-add-line",
    },
    {
      label: "Link",
      className: "ri-link",
    },
  ];

  return (
    <>
      <div className="mb-3">
        <GoogleDrivePickerButton />
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter assignment title"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Instructions (optional)</label>
        <ReactQuill style={{ height: "100px" }} />
      </div>

      <div
        className="border rounded p-3 "
        style={{ maxWidth: "760px", marginTop: "50px" }}
      >
        <p className="mb-3 small text-secondary">Attach</p>
        <div
          className="d-flex justify-content-between mx-auto"
          style={{ maxWidth: "320px" }}
        >
          {items.map(({ label, className }) => (
            <div key={label} className="d-flex flex-column align-items-center">
              <button
                type="button"
                aria-label={label}
                className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: "48px", height: "48px" }}
                onClick={() => {
                  handleAttachFileUpload(label);
                }}
              >
                <i class={className} />
              </button>
              <span
                className="mt-1 fw-semibold"
                style={{ fontSize: "10px", color: "#212529" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="row mt-4">
        {files.length > 0
          ? files.map((file) => (
              <div key={file.id} className="col-12 mb-3">
                <div className="d-flex align-items-center border rounded p-2">
                  <img
                    src={file.iconUrl}
                    alt={file.name}
                    style={{ width: "40px", height: "40px" }}
                    className="me-3"
                  />
                  <div className="flex-grow-1">
                    <div className="fw-semibold">{file.name}</div>
                    <div className="text-muted small">
                      {getReadableFileType(file.mimeType)}
                    </div>
                  </div>
                  <button className="btn">
                    <i style={{ fontSize: "22px" }} class="ri-close-line"></i>
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <label className="form-label">For</label>
          <select className="form-select">
            <option>All Students</option>
            <option>Group A</option>
            <option>Group B</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Assign to</label>
          <select className="form-select">
            <option>100</option>
            <option>50</option>
            <option>25</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Topics</label>
          <CreatableSelect
            isMulti
            isClearable
            onChange={handleTopicChange}
            onCreateOption={handleCreateTopic}
            options={topics}
            value={selectedTopic}
          />
        </div>
      </div>
      <div className="mt-4" style={{ float: "right" }}>
        <button
          onClick={props.toggleMaterialModal}
          className="btn btn-secondary "
          style={{ marginRight: "4px" }}
        >
          Cancel
        </button>

        <button className="btn btn-primary me-2 ">Save</button>
      </div>

      {/* Youtube Video Picker Modal */}
      {YoutubeModal && <div className="modal-backdrop fade show"></div>}
      <div
        className={`modal fade ${YoutubeModal ? "show" : ""}`}
        style={{ display: YoutubeModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header" style={{ background: "white" }}>
              <h5
                className="modal-title d-flex align-items-center gap-2"
                style={{
                  color: "black",
                  fontWeight: "710",
                  fontFamily: "sans-serif",
                }}
                id="exampleModalLabel"
              >
                <i
                  className="fab fa-youtube"
                  style={{
                    fontSize: "24px",
                    color: "red",
                    marginRight: "-6px",
                  }}
                ></i>
                YouTube
              </h5>
              <button
                type="button"
                className="btn ms-auto"
                onClick={() => setYoutubeModal(false)}
                aria-label="Close"
              >
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  style={{ color: "black", fontSize: "22px" }}
                ></i>
              </button>
            </div>

            <div className="modal-body text-center">
              <div>
                <YouTubePicker
                  onSelect={(url, title) => {
                    setSelectedUrl(url);
                  }}
                  selectedUrl={selectedUrl}
                  setSelectedUrl={setSelectedUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Material;
