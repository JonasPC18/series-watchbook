import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark navbar-custom mb-4">
      <div className="container">
        
        <span className="navbar-brand fw-bold text-uppercase d-flex align-items-center">
          <i className="bi bi-camera-reels me-2"></i> Series Watchbook
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#main-navbar"
          aria-controls="main-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end to="/" className="nav-link">
                <i className="bi bi-house me-2"></i>Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sobre" className="nav-link">
                <i className="bi bi-info-circle me-2"></i>Sobre
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cadastro" className="nav-link">
                <i className="bi bi-plus-square me-2"></i>Cadastrar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/lista" className="nav-link">
                <i className="bi bi-tv me-2"></i>Lista de Séries
              </NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
