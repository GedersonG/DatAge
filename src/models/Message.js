import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Message", schema);
