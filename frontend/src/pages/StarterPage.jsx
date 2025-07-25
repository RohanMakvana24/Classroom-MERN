import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../public/assets/css/landingoage.css";
export const StarterPage = () => {
  return (
    <>
      <main className="main-container">
        {/* Decorative Shapes */}
        <img
          className="decorative-shape top-left-large"
          src="https://storage.googleapis.com/a1aa/image/e2ecde30-1ca6-49bb-394a-f759c744928e.jpg"
          alt="Decorative"
        />
        <img
          className="decorative-shape top-left-small"
          src="https://storage.googleapis.com/a1aa/image/96cd0c28-52dd-4c3c-1eb9-6d052f05275c.jpg"
          alt="Decorative"
        />
        <img
          className="decorative-shape bottom-left"
          src="https://storage.googleapis.com/a1aa/image/6fa8dd3d-736f-4c92-389d-5bda9f0430f1.jpg"
          alt="Decorative"
        />
        <img
          className="decorative-shape right-top"
          src="https://storage.googleapis.com/a1aa/image/7c7418fc-1813-411a-40f7-79e14e6d51f7.jpg"
          alt="Decorative"
        />
        <img
          className="decorative-shape right-bottom"
          src="https://storage.googleapis.com/a1aa/image/4913139d-b282-4ce2-864b-3999f5100e35.jpg"
          alt="Decorative"
        />

        {/* Left Section */}
        <section
          className="d-flex flex-column justify-content-between flex-grow-1"
          style={{ maxWidth: "480px" }}
        >
          <div className="d-flex align-items-center mb-4">
            <img
              src="/assets/images/logo/learnix.png"
              width="190"
              height="43"
              className="me-2"
              alt="Logo"
            />
          </div>
          <div>
            <p
              className="mb-1"
              style={{ fontSize: "1rem", fontWeight: 400, color: "#333" }}
            >
              Lets
            </p>
            <h1
              className="mb-1"
              style={{ fontSize: "2.5rem", fontWeight: 800, color: "#6c70e2" }}
            >
              E-learning
            </h1>
            <h2
              className="mb-4"
              style={{ fontSize: "1.75rem", fontWeight: 800, color: "#333" }}
            >
              at your home
            </h2>
            <p className="mb-4" style={{ fontSize: "0.875rem", color: "#666" }}>
              Explore high-quality online learning resources to master new
              skills at your own pace — anytime, anywhere. Whether you're a
              student or a lifelong learner, our platform makes learning easier
              and more accessible.
            </p>
          </div>
          <div className="d-flex gap-3 mb-4">
            <NavLink to="/login" className="btn btn-primary btn-primary-custom">
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="btn btn-outline btn-outline-custom"
            >
              Ragister
            </NavLink>
          </div>
          <div className="social-icons d-flex">
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </section>

        {/* Right Section */}
        <section
          className="position-relative d-flex justify-content-center align-items-center flex-grow-1"
          style={{ minWidth: "320px" }}
        >
          <div className="image-container">
            <img
              src="https://storage.googleapis.com/a1aa/image/32f82733-d0d9-47d8-9d3b-23da3df1415a.jpg"
              alt="Learning"
            />
          </div>
          <div className="vertical-dots d-none d-md-flex">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="chat-bubble d-none d-md-flex" role="button">
            <i className="fas fa-comment-alt"></i>
          </div>
        </section>
      </main>{" "}
    </>
  );
};
