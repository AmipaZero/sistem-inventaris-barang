import mongoose from "mongoose";

const transaksiMasukSchema = new mongoose.Schema({
  id_barang: { type: mongoose.Schema.Types.ObjectId, ref: "Barang", required: true },
  jumlah_masuk: { type: Number, required: true },
  tanggal_masuk: { type: Date, default: Date.now },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const TransaksiMasuk = mongoose.model("TransaksiMasuk", transaksiMasukSchema);