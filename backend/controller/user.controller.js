import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    // Debug incoming request body
    console.log("Incoming request body:", req.body);

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP and expiration
    const verificationOTP = Math.floor(100000 + Math.random() * 900000); // 6 digit OTP
    const OTPExpire = Date.now() + 15 * 60 * 1000; // Corrected Date.now()

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      profileImage: profileImage || "",
      isVerified: false, // User is not verified by default
      verificationOTP,
      OTPExpire,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

export const login = (req, res) => {
  console.log("the login function is clicked");
  res.send("the login is clicked");
};
