import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connString = process.env.DATABASE_CONNECTION;

const connectDB = async () => {
  try {
    await mongoose.connect(connString, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });
    console.log("mongoDB connection successful");
  } catch (error) {
    console.log(`mongoDB connection failed - ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
