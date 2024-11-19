import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { emailProvider } from "../utils/emailProvider.js";
import { generateToken } from "../utils/generateToken.js";
import validator from "validator";

// signup API
export const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    // Debug incoming request body
    // console.log("Incoming request body:", req.body);
    const errors = [];

    if (!name || name.length < 3 || name.length > 10) {
      errors.push(
        "name is required either at least with 3 character and not  more than 10 character"
      );
    }
    if (!validator.isEmail(email)) {
      errors.push("Invalid email");
    }

    // validate password
    if (!password || password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    } else if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    } else if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
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
    console.log(verificationOTP);
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

    await emailProvider(newUser.email, verificationOTP);

    const token = generateToken(newUser);
    res.cookie("jwttoken", token, { maxage: 3600000 });

    // console.log("ccccccccccc", cookie.req);
    return res.status(200).json({
      message: "User registered successfully",
      newUser: {
        name: newUser.name,
        email: newUser.email,
        isVerified: false,
        token,
      },
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

//  verification-otp API (after sign-up)
export const verifyotp = async (req, res) => {
  try {
    const { verificationOTP } = req.body;

    const user = await userModel.findOne({ verificationOTP });

    if (!user) {
      return res.status(400).json({ message: "Invalid message" });
    }

    if (user.OTPExpire < Date.now()) {
      return res.status(400).json({ message: "Otp is expire" });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({
      message: " email verified successfully",
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = [];

    if (!validator.isEmail(email)) {
      errors.push("Invalid email password");
    }

    // validate password
    if (!password || password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    } else if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    } else if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    // find user
    const user = await userModel.findOne({ email });

    // check if user is exist or not

    if (!user) {
      return res
        .status(400)
        .json({ message: "either enail or password is wrong" });
    }

    if (!user.isVerified) {
      return res
        .status(400)
        .json({ message: "plz verify your email before login" });
    }

    // compare hashed password with actual password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ messsage: "Invalid passworrd" });
    }

    const token = generateToken(user);

    res.cookie("jwtToken", token, { maxage: 3600000 });

    return res.status(200).json({
      message: "User succesfully login",
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
