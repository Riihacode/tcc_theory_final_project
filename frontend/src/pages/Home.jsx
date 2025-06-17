import NoteList from '../components/NoteList';
import NoteForm from '../components/NoteForm';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Hapus token
    alert("Logout berhasil");
    navigate("/login"); // Redirect ke login
  };

  return (
    <div style={{
      minHeight: "100vh",
      minWidth: "100vw",
      background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
      fontFamily: "Arial, sans-serif",
      padding: "40px 20px"
    }}>
      <div style={{
        maxWidth: 700,
        margin: "0 auto",
        background: "#fff",
        padding: "30px",
        borderRadius: 16,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{
            marginBottom: 20,
            color: "#333",
            fontWeight: "bold"
          }}>
            📝 Aplikasi Catatan
          </h1>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              background: "#e74c3c",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "#c0392b"}
            onMouseOut={(e) => e.target.style.background = "#e74c3c"}
          >
            Logout
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          <NoteForm onNoteAdded={() => setRefresh(!refresh)} />
        </div>

        <div style={{ marginTop: 30 }}>
          <NoteList key={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Home;
