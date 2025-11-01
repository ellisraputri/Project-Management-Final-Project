import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import admin from "../config/firebase.js"; 

export const loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "No token provided" });

    const decoded = await admin.auth().verifyIdToken(token);
    const { email, name } = decoded;

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name,
        email,
        role: "teacher",
        isDeleted: false,
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: (process.env.NODE_ENV === "production"),
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Firebase verify failed", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: (process.env.NODE_ENV === "production"),
      sameSite: "lax",
    });

    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};

