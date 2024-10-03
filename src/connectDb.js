import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.Mongo_url, {
      dbName: "HireHeaven",
    });
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};
