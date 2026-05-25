import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../assets/book-and-coffee-logo.png";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    const data = await api(
      "http://localhost:5000/api/users/login",
      "POST",
      form,
    );

    console.log("LOGIN RESPONSE:", data);

    if (data.token) {
      login(data.token, data.user);
      navigate("/dashboard");
    } else if (data.error) {
      setError(data.error);
    }
  };

  return (
    <div className="login-page">
      <div className="form-container">
        <div className="logo-area">
          <img src={logo} alt="App Logo" />
        </div>
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button>Login</button>
        </form>
        {/* Link to register page */}
        <p>Don't have an account?</p>
        <p className="register-link">
          <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
