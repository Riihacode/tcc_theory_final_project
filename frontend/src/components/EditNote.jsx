import { useEffect, useState, navigate } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils";

const EditNote = () => {
  const { id } = useParams();  // Ambil parameter id dari URL
  const [note, setNote] = useState({ title: "", content: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get(`${BASE_URL}/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setNote(response.data);
        })
        .catch((err) => {
          setError("Gagal mengambil data note.");
          console.error(err.message);
        });
    } else {
      setError("Token tidak ditemukan. Silakan login.");
    }
  }, [id]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      await axios.put(`${BASE_URL}/notes/${id}`, note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Note berhasil diperbarui!");
    } catch (err) {
      setError("Gagal memperbarui note.");
      console.error(err.message);
    }
  };

  return (
  <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    <div className="card shadow p-4" style={{ width: '100vw'}}>
      <h2 className="text-center mb-4">✏️ Edit Catatan</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Judul</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Masukkan judul catatan"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Isi</label>
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
            className="form-control"
            rows="5"
            placeholder="Tulis isi catatanmu di sini..."
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Simpan Perubahan
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn btn-secondary w-100 mt-3"
        >
          ← Kembali ke Daftar Catatan
        </button>
      </form>
    </div>
  </div>
);

};

export default EditNote;
