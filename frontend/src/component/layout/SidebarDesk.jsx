import React from "react";
import { Link } from 'react-router-dom';

const SidebarDesk = () => {
  return (
    <>
      <nav className="col-lg-2 d-none d-lg-block sidebar bg-light">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/home">
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
              href="#teachingSubmenuDesktop"
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="teachingSubmenuDesktop"
            >
              <i className="fas fa-chalkboard-teacher me-2" /> Teaching
              <i className="fas fa-caret-down float-end" />
            </a>
            <div className="collapse" id="teachingSubmenuDesktop">
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
      </nav>
    </>
  );
};

export default SidebarDesk;
