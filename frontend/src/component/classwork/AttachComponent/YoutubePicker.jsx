import React, { useState } from "react";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import YouTubePreview from "./YouTubePreview";
const YOUTUBE_API_KEY = "AIzaSyBNJhZ2Butvyj53AaUQfdIXnXTmLmE9HuE";

export default function YouTubePicker({
  onSelect,
  selectedUrl,
  setSelectedUrl,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchYouTube = async () => {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: query,
            maxResults: 30,
            key: YOUTUBE_API_KEY,
            type: "video",
          },
        }
      );
      setResults(res.data.items);
    } catch (error) {
      console.error("YouTube API error:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Header with illustration */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <DotLottieReact
          src="https://lottie.host/9a994e29-5acb-4937-9e41-c46d9b9fbbe4/tW4BnqLAts.lottie"
          loop
          autoplay
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            margin: "auto",
            display: "block",
          }}
        />

        {/* Search bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Search YouTube or paste URL"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchYouTube()}
            style={{
              width: "100px",
              flexGrow: 1,
              padding: "12px 16px",
              fontSize: "16px",
              border: "none",
              outline: "none",
            }}
          />
          <button
            onClick={searchYouTube}
            style={{
              background: "#f5f5f5",
              border: "none",
              padding: "0 20px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            🔍
          </button>
        </div>
      </div>

      {/* Results grid */}
      {selectedUrl ? (
        <>
          <YouTubePreview
            selectedUrl={selectedUrl.url}
            title={selectedUrl.title}
            description={selectedUrl.description}
            setSelectedUrl={setSelectedUrl}
            onAdd={(url) => console.log(url)}
          />
        </>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "30px",
            }}
          >
            {results.map((video) => (
              <div
                key={video.id.videoId}
                onClick={() =>
                  onSelect({
                    id: video.id.videoId,
                    url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
                    title: video.snippet.title,
                    description: video.snippet.description,
                  })
                }
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0, 0, 0, 0.05)";
                }}
              >
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  style={{ width: "100%", display: "block" }}
                />
                <div style={{ padding: "12px" }}>
                  <a
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      margin: "0 0 4px",
                      color: "#333",
                    }}
                  >
                    {video.snippet.title}
                  </a>
                  <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>
                    {video.snippet.channelTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
