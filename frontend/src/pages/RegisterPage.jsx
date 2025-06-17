import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api.js";  // Import createUser dari api.js
import { Link } from "react-router-dom";

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
  <div style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
    fontFamily: "Arial, sans-serif"
  }}>
    <div style={{
      maxWidth: 400,
      width: "100%",
      padding: 30,
      borderRadius: 12,
      background: "#fff",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 20,
        color: "#333"
      }}>
        Register
      </h2>

      {error && (
        <div style={{
          background: "#ffe5e5",
          color: "#c00",
          padding: 10,
          borderRadius: 8,
          marginBottom: 15,
          fontWeight: "bold"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, color: "#555" }}>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14
            }}
          />
        </div>

        <div style={{ marginBottom: 15 }}>
          <label style={{ display: "block", marginBottom: 5, color: "#555" }}>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14
            }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 5, color: "#555" }}>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ccc",
              fontSize: 14
            }}
          />
        </div>

        <button type="submit" style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: 8,
          background: "#4A90E2",
          color: "#fff",
          fontSize: 16,
          cursor: "pointer",
          transition: "background 0.3s"
        }}
        onMouseOver={(e) => e.target.style.background = "#357ABD"}
        onMouseOut={(e) => e.target.style.background = "#4A90E2"}
        >
          Register
        </button>
         <Link to="/login" style={{
          display: "block",
          textAlign: "center",
          marginTop: 10,
          color: "#4A90E2",
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          ← Kembali ke Login
        </Link>
      </form>
    </div>
  </div>
);

}
