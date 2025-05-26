import { useEffect, useState } from "react";
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
    <div>
      <h1>Edit Note</h1>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Note</button>
      </form>
    </div>
  );
};

export default EditNote;
