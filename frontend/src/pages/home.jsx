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
    <div>
      <h1 className="text-center mt-4 mb-4">📝 Aplikasi Catatan</h1>
      <NoteForm onNoteAdded={() => setRefresh(!refresh)} />
      <NoteList key={refresh} />
       {/* Tombol Logout */}
      <button onClick={handleLogout} style={{ marginTop: 20 }}
      className="btn btn-danger btn-sm"
      >
        Logout
      </button>
      
    </div>
  );
};

export default Home;
