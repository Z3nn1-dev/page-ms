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
    checkUsernamePass: {
      type: Boolean,
      default: false,
    },
    checkTwoFa: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", schema);
