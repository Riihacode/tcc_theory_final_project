import { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../api';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import dayjs from "dayjs";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [user_id, setUser_id] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    setUser_id(null);
    return;
  }

  (async () => {
    const decoded = jwtDecode(token);
    setUser_id(decoded.id);
    console.log("User ID:", decoded.id); 
  })()
  }, []);

  useEffect(() => {
    if (user_id) {
      fetchNotes();
    }
  }, [user_id]);

  const fetchNotes = async () => {
    try {
      const { data } = await getNotes();

      const filteredNotes = data.filter(note => note.user_id === user_id)

      setNotes(filteredNotes);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      fetchNotes();
    } catch (error) {
      console.error("Gagal menghapus catatan:", error);
    }
  };

  const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};


   return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📌 Daftar Catatan</h2>

      {notes.length === 0 ? (
        <p className="text-center text-muted">Belum ada catatan</p>
      ) : (
        <div className="row justify-content-center">
          {notes.map((note) => (
            <div key={note.id} className="col-lg-6 col-md-6 col-sm-12 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text text-muted" style={{ whiteSpace: "pre-line" }}>
                    {truncateText(note.content, 100)}
                  </p>


                  {/* createdAt & updatedAt */}
                  <p className="text-muted mb-2" style={{ fontSize: "0.8rem" }}>
                    Dibuat:{" "}
                    {dayjs(note.createdAt).format("DD MMM YYYY, HH:mm")} <br />
                    Diperbarui:{" "}
                    {dayjs(note.updatedAt).format("DD MMM YYYY, HH:mm")}
                  </p>

                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => navigate(`/edit/${note.id}`)}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
