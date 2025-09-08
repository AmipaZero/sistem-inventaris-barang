import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import kategoriRoute from "./routes/kategoriRoute.js";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import barangRoutes from "./routes/barangRoute.js";
import transaksiMasuk from "./routes/transaksiMasukRoute.js";
import transaksiKeluar from "./routes/transaksiKeluarRoute.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk parse body JSON
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5000", credentials: true  }));
// Koneksi ke database
await connectDB();
dotenv.config();
// Rute untuk produk
app.use("/api/kategoris", kategoriRoute);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/barangs", barangRoutes);
app.use("/api/transaksiMasuk", transaksiMasuk);
app.use("/api/transaksiKeluar", transaksiKeluar);


app.listen(PORT, () => {
  console.log(` Server berjalan di port http://localhost:${PORT}`);
});
