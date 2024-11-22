import express from "express";
import {
  forgetpassword,
  login,
  logout,
  resetpassword,
  signUp,
  verifyotp,
} from "../controller/user.controller.js";
import { getApiKey } from "../middleware/getApiKey.js";

const router = express.Router();
router.post("/signup", getApiKey, signUp);
router.post("/verify-otp", verifyotp);
router.post("/login", login);
router.post("/forget-password", forgetpassword);
router.post("/reset-password", resetpassword);
router.get("/logout", logout);

export default router;
