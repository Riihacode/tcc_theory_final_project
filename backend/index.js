import express from "express";
import cors from "cors";
import noteRoute from "./routes/noteRoute.js";
import userRoute from "./routes/userRoute.js"
import dotenv from "dotenv";
import db from "./config/database.js"; // ⬅ penting!

// Inisialisasi model untuk relasi
import "./models/user.js";
import "./models/notes.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rute utama untuk catatan
app.use(noteRoute);
app.use(userRoute);

// Sinkronisasi database
db.sync().then(() => console.log("✅ Semua tabel berhasil disinkron!"));

// Menjalankan server
app.listen(5000, () => console.log("🚀 Server berjalan di port 5000"));
