import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="app-title">
          The Literary Lounge
        </Link>
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
