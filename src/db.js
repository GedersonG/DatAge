import { connect, set } from "mongoose";
import { MONGODB_URI } from "./config";

export const connectDB = async () => {
  try {
    set("strictQuery", false);
    await connect(MONGODB_URI);
    console.log("Hello World By DBSocket");
  } catch (err) {
    console.log(err);
  }
};
