import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/dashboard">Dashboard</Link>

      {token && (
        <button onClick={logout} style={{ marginLeft: "20px" }}>
          Logout
        </button>
      )}
    </nav>
  );
}
