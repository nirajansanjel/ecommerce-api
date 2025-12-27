import mongoose from "mongoose";
import config from "../config/config.js";

async function database() {
  try {
    const status = await mongoose.connect(config.MONGODB);
    console.log(`Mongo DB connected :${status.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
}
export default database;
