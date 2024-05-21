import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "";
let cached = (global as any).mongoose || { cached: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "Evently",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
