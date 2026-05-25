import { useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
import logo from "../assets/book-and-coffee-logo.png";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    terms: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setErrors({ username: "", password: "", repeatPassword: "", terms: "" });

    const newErrors = {};

    // Username validation - at least 3 characters
    if (form.username.trim().length < 3) {
      newErrors.username = "Invalid Username";
    }

    // Password validation - at least 8 characters and contain a number
    if (form.password.trim().length < 8 || !/\d/.test(form.password.trim())) {
      newErrors.password =
        "Password must be at least 8 characters and contain a number";
    }

    // Repeat password validation
    if (
      form.password &&
      form.repeatPassword &&
      form.password !== form.repeatPassword
    ) {
      newErrors.repeatPassword = "Passwords do not match.";
    }

    // Terms and Conditions checkbox validation
    if (!form.terms) {
      newErrors.terms = "You must agree before registering";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = await api(
      "http://localhost:5000/api/users/register",
      "POST",
      form,
    );

    if (data.error) {
      if (data.error === "Username already taken") {
        setErrors((prev) => ({ ...prev, username: data.error }));
        return;
      }

      setError(data.error);
      return;
    }

    alert("Registered successfully");
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="logo-area">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) => {
                setForm({ ...form, username: e.target.value });
                if (errors.username) {
                  setErrors({ ...errors, username: "" });
                }
              }}
            />

            <div className="error-field">
              {errors.username && <span>{errors.username}</span>}
            </div>
          </div>

          <div className="form-row">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value });
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
            />
            <div className="error-field">
              {errors.password && <span>{errors.password}</span>}
            </div>
          </div>

          <div className="form-row">
            <input
              type="password"
              placeholder="Repeat Password"
              value={form.repeatPassword}
              onChange={(e) => {
                setForm({ ...form, repeatPassword: e.target.value });
                if (errors.repeatPassword) {
                  setErrors({ ...errors, repeatPassword: "" });
                }
              }}
            />
            <div className="error-field">
              {errors.repeatPassword && <span>{errors.repeatPassword}</span>}
            </div>
          </div>
          <div className="checkbox-row">
            <div className="checkbox-field">
              <input
                type="checkbox"
                id="terms"
                checked={form.terms}
                onChange={(e) => {
                  setForm({ ...form, terms: e.target.checked });
                  if (errors.terms) {
                    setErrors({ ...errors, terms: "" });
                  }
                }}
              />
              <label htmlFor="terms">
                I agree to Terms and Conditions and Privacy Policy
              </label>
            </div>
            <div className="checkbox-error">
              {errors.terms && <span>{errors.terms}</span>}
            </div>
          </div>
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
