import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/navbar-book-and-lounge-logo-2.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="app-logo">
          <img src={logo} alt="App Logo" />
        </Link>
      </div>

      <div className="navbar-center">
        <h1 className="app-title">The Literary Lounge</h1>
      </div>

      <div className="navbar-right">
        <span className="welcome-text">
          Welcome{user?.username ? `, ${user.username}` : ""}
        </span>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
