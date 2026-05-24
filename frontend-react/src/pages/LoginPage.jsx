import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await api(
      "http://localhost:5000/api/users/login",
      "POST",
      form,
    );

    console.log("LOGIN RESPONSE:", data);

    if (data.token) {
      login(data.token, data.user);
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
