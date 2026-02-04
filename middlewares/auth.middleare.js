import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ token নেওয়া (header থেকে)
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ token verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ user খুঁজে বের করা
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 4️⃣ req এর সাথে user attach
    req.user = user;

    // 5️⃣ next route এ পাঠাও
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;