import { useEffect, useState } from 'react';
import { createNote } from '../api';
import { jwtDecode } from 'jwt-decode';


const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user_id, setUser_id] = useState(null);
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser_id("null");
      return;
    }
    
    const decodeToken = async() => {
      try {
        const decoded = jwtDecode(token);
        setUser_id(decoded.id);
      } catch (error) {
        console.error("Gagal decode token : ",error);
        setUser_id(null);
        
      }
    };

    decodeToken();
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user_id){
      console.error("user id gaada");
      return;
    }

    try {
      await createNote({ title, content, user_id });
      setTitle('');
      setContent('');
      onNoteAdded();
    } catch (error) {
      console.error("Gagal menambahkan catatan:", error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-12">
        <div className="card shadow p-4">
          <h2 className="text-center">✍ Tambah Catatan</h2>
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
              <label className="form-label">Judul</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan judul catatan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Isi Catatan</label>
              <textarea
                className="form-control"
                placeholder="Masukkan isi catatan"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Tambah Catatan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
