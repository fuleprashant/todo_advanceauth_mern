import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("the database is connecte to the backend");
  } catch (error) {
    console.log(error);
  }
};

export default db;
