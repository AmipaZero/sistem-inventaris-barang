import Kategori from "../models/kategori.js";

// mengambil semua data
export const getAllKategori = async (req, res) => {
  try {
    const katgoriList = await Kategori.find();
    res.json(katgoriList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getKategoriById = async (req, res) => {
  const { id } = req.params; 

  try {
    const kategori = await Kategori.findById(id);
    if (!kategori) {
      return res.status(404).json({ message: "Kategori tidak di temukan!" });
    }
    res.json(kategori);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addKategori = async (req, res) => {
  const { nama_kategori } = req.body;
  const newKategori  = new Kategori({
    nama_kategori,
  });

  try {
    await newKategori.save();
    res.status(201).json({message: "Barang berhasil ditambahkan", newKategori });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const updateKategori = async (req, res) => {
  const { id } = req.params;
  const { nama_kategori } = req.body;

  try {
    const kategori = await Kategori.findByIdAndUpdate(id, {nama_kategori}, 
      { new: true, 
       runValidators: true });
    if (!kategori) {
      return res.status(404).json({ message: "Kategori Tidak Ditemukan!" });
    }
    res.json(kategori);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteKategori = async (req, res) => {
  const { id } = req.params;

  try {
    const kategori = await Kategori.findByIdAndDelete(id);
    if (!kategori) {
      return res.status(404).json({ message: "Kategori tidak di temukan!" });
    }
    res.json({ message: "Kategori berhasil di hapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getReportKategori = async (req, res) => {
  try {
    
    res.status(200).json(["oke"]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
