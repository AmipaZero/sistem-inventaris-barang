import jwt from "jsonwebtoken";
import User from "../models/user.js";

const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Middleware untuk semua role
const protect = async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

   try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);

    
    if (!user || !user.token || user.token !== token) {
      return res.status(401).json({ message: "Token sudah tidak berlaku, silakan login ulang" });
    }

    req.userId = user._id;
    req.userRole = user.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid atau expired" });
  }
};



// Admin only
const isAdmin = (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admin only." });
    }

    next();
  } catch (err) {
    console.error("Admin auth error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
};



export {
  protect,
  isAdmin

};
