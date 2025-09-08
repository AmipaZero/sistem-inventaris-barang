import mongoose from "mongoose";

const barangSchema = new mongoose.Schema({
  nama_barang: { type: String, required: true },
  id_kategori: { type: mongoose.Schema.Types.ObjectId, ref: "Kategori", required: true },
  stok: { type: Number, required: true, default: 0 },
  satuan: { type: String, required: true }, // contoh: unit, pcs, box
  kondisi: { type: String, enum: ["baru", "baik", "rusak", "hilang"], default: "baik" },
  lokasi: { type: String, required: true }
}, { timestamps: true });

export const Barang = mongoose.model("Barang", barangSchema);