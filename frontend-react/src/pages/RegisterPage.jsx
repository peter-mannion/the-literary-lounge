import { useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import logo from "../assets/book-and-coffee-logo.png";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api("http://localhost:5000/api/users/register", "POST", form);
    alert("Registered successfully");
  };

  return (
    <div className="register-page">
      <div className="form-container">
        <div className="logo-area">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Register</h1>
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
          <button>Register</button>
        </form>
        <p>Already have an account?</p>
        <p className="login-link">
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
