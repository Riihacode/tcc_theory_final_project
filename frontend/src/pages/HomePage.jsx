import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios
        .get(`{${BASE_URL}}/notes`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Kirim token untuk otentikasi
          },
        })
        .then((response) => {
          setNotes(response.data);
        })
        .catch((err) => {
          setError("Gagal memuat data notes.");
          console.error(err.message);
        });
    } else {
      setError("Token tidak ditemukan. Silakan login.");
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((note) => (
            <div key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <a href={`/edit/${note.id}`}>Edit</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
