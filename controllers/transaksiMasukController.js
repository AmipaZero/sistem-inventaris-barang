import { Barang } from "../models/barang.js";
import { TransaksiMasuk } from "../models/transaksiMasuk.js";

export const getAllTransaksiMasuk = async (req, res) => {
  try {
    const transaksi = await TransaksiMasuk.find()
      .populate("id_barang", "nama_barang satuan stok")
      .populate("id_user", "nama username");
    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransaksiMasukById = async (req, res) => {
  try {
    const transaksi = await TransaksiMasuk.findById(req.params.id)
      .populate("id_barang", "nama_barang satuan stok")
      .populate("id_user", "nama username");

    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi Masuk tidak ditemukan" });
    }

    res.json(transaksi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createTransaksiMasuk = async (req, res) => {
  const { id_barang, jumlah_masuk, id_user } = req.body;

  try {
    // cari barang
    const barang = await Barang.findById(id_barang);
    if (!barang) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    // update stok barang
    barang.stok += jumlah_masuk;
    await barang.save();

    // simpan riwayat transaksi masuk
    const transaksi = new TransaksiMasuk({
      id_barang,
      jumlah_masuk,
      id_user
    });

    await transaksi.save();

    res.status(201).json({
      message: "Transaksi masuk berhasil",
      data: transaksi,
      stok_sekarang: barang.stok
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTransaksiMasuk = async (req, res) => {
  try {
    const transaksi = await TransaksiMasuk.findById(req.params.id);
    if (!transaksi) {
      return res.status(404).json({ message: "Transaksi Masuk tidak ditemukan" });
    }


    await transaksi.deleteOne();
    res.json({ message: "Transaksi Masuk berhasil dihapus dan stok diperbarui" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const reportTransaksiMasuk = async (req, res) => {
  try {
    const laporan = await TransaksiMasuk.find()
      .populate("id_barang", "nama_barang satuan stok")
      .populate("id_user", "nama username");

    res.status(200).json({
      message: "Laporan transaksi masuk berhasil diambil",
      data: laporan
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};