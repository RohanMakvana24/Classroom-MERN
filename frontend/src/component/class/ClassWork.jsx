import React, { useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import Assingment from "../classwork/Assingment";
import QuizAssingment from "../classwork/QuizAssingment";
import Material from "../classwork/Material";
const ClassWork = () => {
  const [AssingmentModal, setAssingmentModal] = useState(false);
  const [QuizAssingmentModal, setQuizAssingmentModal] = useState(false);
  const [MaterialModal, setMaterialModal] = useState(false);
  const OpenMaterialModal = useRef(null);
  // Handle Assingment Modal PopUp
  const toggleAssingmentModal = () => setAssingmentModal(!AssingmentModal);

  //Handle Quiz Assingment Modal PopUp
  const toggleQuizAssingmentModal = () =>
    setQuizAssingmentModal(!QuizAssingmentModal);

  //Handle Material Modal PopUp
  const toggleMaterialModal = () => setMaterialModal(!MaterialModal);

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <div className="text-center">
        <div className="dropdown">
          <button
            style={{ float: "top" }}
            className="btn btn-primary rounded-pill px-4 py-2 fw-bold"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fas fa-plus me-2" /> Create
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" onClick={toggleAssingmentModal}>
                <i class="ri-book-2-line"></i> Assignment
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={toggleQuizAssingmentModal}>
                <i class="ri-booklet-line"></i> Quiz Assignment
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                ref={OpenMaterialModal}
                onClick={toggleMaterialModal}
              >
                <i class="ri-book-shelf-line"></i> Material
              </a>
            </li>
          </ul>
        </div>

        <hr className="my-4" />
        <img
          src="https://placehold.co/100x100"
          alt="Illustration of a computer and a dog sitting beside it"
          className="mb-3"
        />
        <div className="fw-bold text-secondary mb-2">
          This is where you’ll assign work
        </div>
        <div className="text-muted">
          You can add assignments and other work for the class, then organize it
          into topics
        </div>
      </div>
      {/* Assingment Modal */}
      {AssingmentModal && <div className="modal-backdrop fade show"></div>}
      <div
        className={`modal fade ${AssingmentModal ? "show" : ""}`}
        style={{ display: AssingmentModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header" style={{ background: "blue" }}>
              <h5
                className="modal-title"
                style={{ color: "White", fontWeight: "600" }}
                id="exampleModalLabel"
              >
                Create Assignment
              </h5>
              {/* Close Button on the Right */}
              <button
                type="button"
                className="btn  ms-auto"
                onClick={toggleAssingmentModal}
                aria-label="Close"
              >
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  style={{ color: "white", fontSize: "22px" }} // Set icon color to white
                ></i>
              </button>
            </div>

            <div className="modal-body">
              <Assingment toggleAssingmentModal={toggleAssingmentModal} />
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Assingment Modal */}
      {QuizAssingmentModal && <div className="modal-backdrop fade show"></div>}

      <div
        className={`modal fade ${QuizAssingmentModal ? "show" : ""}`}
        style={{ display: QuizAssingmentModal ? "block" : "none" }}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="quizModalLabel"
        aria-hidden={!QuizAssingmentModal}
      >
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header" style={{ background: "blue" }}>
              <h5
                className="modal-title"
                id="quizModalLabel"
                style={{ color: "white", fontWeight: "600" }}
              >
                Create Quiz Assignment
              </h5>
              <button
                type="button"
                className="btn ms-auto"
                onClick={toggleQuizAssingmentModal}
                aria-label="Close"
              >
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  style={{ color: "white", fontSize: "22px" }}
                ></i>
              </button>
            </div>

            {/* Modal Body */}
            <div className="modal-body p-4" style={{ overflowY: "auto" }}>
              {/* <MaterialForm /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Material Modal */}
      {MaterialModal && <div className="modal-backdrop fade show"></div>}
      <div
        className={`modal fade ${MaterialModal ? "show" : ""}`}
        style={{ display: MaterialModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg ">
          <div className="modal-content">
            <div className="modal-header" style={{ background: "blue" }}>
              <h5
                className="modal-title"
                style={{ color: "White", fontWeight: "600" }}
                id="exampleModalLabel"
              >
                Create Material
              </h5>
              {/* Close Button on the Right */}
              <button
                type="button"
                className="btn  ms-auto"
                onClick={toggleMaterialModal}
                aria-label="Close"
              >
                <i
                  className="fa fa-times"
                  aria-hidden="true"
                  style={{ color: "white", fontSize: "22px" }} // Set icon color to white
                ></i>
              </button>
            </div>

            <div className="modal-body">
              <Material
                OpenMaterialModal={OpenMaterialModal}
                toggleMaterialModal={toggleMaterialModal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassWork;
