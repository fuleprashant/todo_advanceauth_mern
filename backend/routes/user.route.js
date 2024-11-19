import express from "express";
import { login, signUp, verifyotp } from "../controller/user.controller.js";

const router = express.Router();
router.post("/signup", signUp);
router.post("/verify-otp", verifyotp);
router.post("/login", login);

export default router;
