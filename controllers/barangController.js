import { Barang } from "../models/barang.js";


export const getAllBarang = async (req, res) => {
  try {
    const barang = await Barang.find()
      .populate("id_kategori", "nama_kategori")
      .populate("id_lokasi", "nama_lokasi");
    res.status(200).json(barang);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data barang", error: err.message });
  }
};


export const getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id)
      .populate("id_kategori", "nama_kategori")
      .populate("id_lokasi", "nama_lokasi");

    if (!barang) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    res.status(200).json(barang);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil detail barang", error: err.message });
  }
};
export const createBarang = async (req, res) => {
  const { nama_barang, id_kategori, stok, satuan, kondisi, lokasi } = req.body;

  try {
    
    const existingBarang = await Barang.findOne({ nama_barang, lokasi });

    if (existingBarang) {
      return res.status(400).json({ message: "Barang sudah ada di lokasi ini" });
    }

    const barang = new Barang({
      nama_barang,
      id_kategori,
      stok,
      satuan,
      kondisi,
      lokasi,
    });

    await barang.save();
    res.status(201).json({ message: "Barang berhasil ditambahkan", data: barang });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBarang = async (req, res) => {
  try {
    const updated = await Barang.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    res.status(200).json({ message: "Barang berhasil diperbarui", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal memperbarui barang", error: err.message });
  }
};



export const deleteBarang = async (req, res) => {
  try {
    const deleted = await Barang.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    res.status(200).json({ message: "Barang berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menghapus barang", error: err.message });
  }
};
export const getReportBarang = async (req, res) => {
  try {
    const barang = await Barang.find()
      .populate("id_kategori", "nama_kategori")
      .populate("id_lokasi", "nama_lokasi")
      .select("nama_barang stok satuan kondisi id_kategori id_lokasi");

    const laporan = barang.map(item => ({
      id: item._id,
      nama_barang: item.nama_barang,
      kategori: item.id_kategori?.nama_kategori || "-",
      lokasi: item.id_lokasi?.nama_lokasi || "-",
      stok: item.stok,
      satuan: item.satuan,
      kondisi: item.kondisi
    }));

    res.status(200).json({
      message: "Laporan Barang",
      total: laporan.length,
      data: laporan
    });
  } catch (err) {
    console.error("Error laporan barang:", err);
    res.status(500).json({ message: "Gagal membuat laporan barang" });
  }
};

