import mongoose from "mongoose";


const transaksiKeluarSchema = new mongoose.Schema({
  id_barang: { type: mongoose.Schema.Types.ObjectId, ref: "Barang", required: true },
  jumlah_keluar: { type: Number, required: true },
  tanggal_keluar: { type: Date, default: Date.now },
  penerima: { type: String, required: true }, // nama pegawai/unit
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const TransaksiKeluar = mongoose.model("TransaksiKeluar", transaksiKeluarSchema);
