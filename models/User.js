import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    twofa: {
      type: String,
    },

  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", schema);
