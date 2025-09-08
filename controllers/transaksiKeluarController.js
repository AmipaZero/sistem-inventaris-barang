import { Barang } from "../models/barang.js";
import { TransaksiKeluar } from "../models/transaksiKeluar.js";


export const getAllTransaksiKeluar = async (req, res) => {
  try {
    const transaksi = await TransaksiKeluar.find()
      .populate("id_barang", "nama_barang satuan stok")
      .populate("id_user", "nama username");
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransaksiKeluarById = async (req, res) => {
  try {
    const transaksi = await TransaksiKeluar.findById(req.params.id)
      .populate("id_barang", "nama_barang satuan stok")
      .populate("id_user", "nama username");

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi Keluar tidak ditemukan" });
    }

    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransaksiKeluar = async (req, res) => {
  const { id_barang, jumlah_keluar, penerima, id_user } = req.body;

  try {
    // cari barang
    const barang = await Barang.findById(id_barang);
    if (!barang) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    // cek stok 
    if (barang.stok < jumlah_keluar) {
      return res.status(400).json({ message: "Stok tidak mencukupi" });
    }

    // kurangi stok barang
    barang.stok -= jumlah_keluar;
    await barang.save();

    // simpan riwayat transaksi keluar
    const transaksi = new TransaksiKeluar({
      id_barang,
      jumlah_keluar,
      penerima,
      id_user
    });

    await transaksi.save();

    res.status(201).json({
      message: "Transaksi keluar berhasil",
      data: transaksi,
      stok_sekarang: barang.stok
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteTransaksiKeluar = async (req, res) => {
  const { id } = req.params;

  try {
    const transaksi = await TransaksiKeluar.findByIdAndDelete(id);

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi keluar tidak ditemukan" });
    }

    res.json({ message: "Transaksi keluar berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const reportTransaksiKeluar = async (req, res) => {
  try {
    const laporan = await TransaksiKeluar.find()
      .populate("id_barang", "nama_barang satuan stok")
      .populate("id_user", "nama username");

    res.status(200).json({
      message: "Laporan transaksi keluar berhasil diambil",
      data: laporan
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
