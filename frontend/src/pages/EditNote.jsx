import { useEffect, useState } from "react";
import { useParams, useNavigate,  } from "react-router-dom";
import { getNoteById } from "../api.js";
import axios from "axios";
import { BASE_URL } from "../utils";
import { jwtDecode } from "jwt-decode";

const EditNote = () => {
  const { id } = useParams();  // Ambil parameter id dari URL
  const [note, setNote] = useState({ title:"", content:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Token tidak ditemukan");
      return;
    }
  
    (async () => {
      try {
        // Dynamic import jwt-decode agar kompatibel dengan Vite
        const decoded = jwtDecode(token);
        const user_id = decoded.id;
        console.log("User Id : ", user_id);
        console.log("Token : ", token);

        const response = await getNoteById(id);
        console.log("Data user id : ", response.data.note.user_id)

        if (response.data.note.user_id !== user_id) {
          setError("Anda tidak punya akses");
          navigate("/home");
        } else {
          setNote(response.data.note);
        }
      } catch (error) {
        setError("Gagal mengambil data note");
        console.error(error.message);
      }
    })();
  }, [id, navigate]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    if(!token){
      setError("Token tidak ditemukan");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.id;

      if (note.user_id !== user_id) {
        setError("Anda tidak mempunyai akses");
        return;
      }

      await axios.put(`${BASE_URL}/edit-note/${id}`, note, { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Note berhasil diperbarui!");
      navigate("/home")
    } catch (err) {
      setError("Gagal memperbarui note.");
      console.error(err.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-12">
        <div className="card shadow p-4">
          <h2 className="text-center">✍ Perbarui Catatan</h2>

          {error && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Judul</label>
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Masukkan judul catatan"
                value={note.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Isi Catatan</label>
              <textarea
                className="form-control"
                name="content"
                placeholder="Masukkan isi catatan"
                value={note.content}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Catatan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
