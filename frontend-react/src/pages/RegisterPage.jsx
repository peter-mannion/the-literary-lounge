import { useState } from "react";
import { api } from "../utils/api";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api("http://localhost:5000/api/users/register", "POST", form);
    alert("Registered successfully");
  };

  return (
    <div>
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
      {/* Link to login page */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
