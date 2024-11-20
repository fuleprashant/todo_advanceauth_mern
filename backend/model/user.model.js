import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; // password is required if googleid is not verified
    },
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationOTP: {
    type: String,
    required: function () {
      return !this.isVerified; // OTP is required if user is not verified
    },
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  OTPExpire: {
    type: Date,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

// Indexes for better performance on email and googleId the use of the index is that when we use any query then at that time mongo use all documents .. and if we use index so at the base if index they find the email or the googleid -- they cant check whole documentation
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });

const userModel = mongoose.model("User", userSchema);
export default userModel;
