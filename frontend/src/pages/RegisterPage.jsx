import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api.js";  // Import createUser dari api.js

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Menggunakan createUser yang sudah didefinisikan di api.js untuk mengirimkan data ke backend
      await createUser(form);
      alert("Pendaftaran berhasil, silakan login");
      navigate("/login");  // Setelah berhasil, arahkan ke halaman login
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Pendaftaran gagal");
      } else {
        setError("Server error, coba lagi nanti");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Register</h2>

      {error && (
        <div style={{ background: "#fdd", color: "#900", padding: 10, marginBottom: 15 }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Register
        </button>
      </form>
    </div>
  );
}
