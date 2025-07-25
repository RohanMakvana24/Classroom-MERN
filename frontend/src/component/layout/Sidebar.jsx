import React from "react";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      {" "}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            Classroom Dashboard
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/home" className="nav-link active">
                <i className="fas fa-home me-2" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-calendar-alt me-2" /> Calendar
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#teachingSubmenu"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="teachingSubmenu"
              >
                <i className="fas fa-chalkboard-teacher me-2" /> Teaching
                <i className="fas fa-caret-down float-end" />
              </a>
              <div className="collapse" id="teachingSubmenu">
                <ul className="nav flex-column ps-4">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Assignments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Quizzes
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Student Progress
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-inbox me-2" /> To review
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-user-circle me-2" /> Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-archive me-2" /> Archived classes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fas fa-cog me-2" /> Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
