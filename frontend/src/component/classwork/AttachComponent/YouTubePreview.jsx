import React from "react";

export default function YouTubePreview({
  title,
  description,
  selectedUrl,
  setSelectedUrl,
  onAdd,
}) {
  console.log(selectedUrl);
  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "'Segoe UI', sans-serif",
        maxWidth: "1000px",
        margin: "auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => setSelectedUrl("")}
        style={{
          background: "none",
          border: "none",
          color: "#1976d2",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "16px",
        }}
      >
        ← Back
      </button>

      {/* Card Container */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          flexWrap: "wrap",
        }}
      >
        {/* Video Section */}
        <div style={{ flex: "1 1 480px", minWidth: "300px" }}>
          <div
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              src={selectedUrl.replace("watch?v=", "embed/")}
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="YouTube Preview"
            />
          </div>
        </div>

        {/* Metadata Section */}
        <div
          style={{
            flex: "1 1 400px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Title */}
          <h2 style={{ fontSize: "20px", marginBottom: "12px" }}>{title}</h2>

          {/* Description (RTL for Arabic) */}
          <p
            style={{
              fontSize: "14px",
              color: "#444",
              lineHeight: "1.6",
              direction: "rtl",
              textAlign: "right",
              overflowY: "auto",
              maxHeight: "120px",
              marginBottom: "20px",
            }}
          >
            {description}
          </p>

          {/* Add Video Button */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => onAdd(selectedUrl)}
              style={{
                padding: "10px 24px",
                fontSize: "15px",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Add video
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
