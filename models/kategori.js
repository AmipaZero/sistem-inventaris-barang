import mongoose from "mongoose";


const kategoriSchema = new mongoose.Schema({
  nama_kategori: { type: String, required: true }
}, { timestamps: true });

export const Kategori = mongoose.model("Kategori", kategoriSchema);
export default Kategori;

