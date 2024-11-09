import { PostModel } from "../models/PostModel.js";
import { v4 } from "uuid";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPost = async (req, res) => {
  try {
    const myUUID = v4();
    req.body.id = myUUID;
    const newPost = req.body;
    const post = new PostModel(newPost);
    await post.save();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Check user name and password
    let checkUsernamePass = true;
    console.log("---Start check Username Password---");
    while (checkUsernamePass) {
      const item = await PostModel.findOne({ id: myUUID });
      if (item) {
        console.log("Item", item);
        checkUsernamePass = !item.checkUsernamePass;
      }
      if (checkUsernamePass) {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        console.log("sleep in 10s");
      }
    }
    console.log("---End check Username Password---");

    // Check two fa
    let checkTwoFa = true;
    console.log("---Start check Two FA---");
    while (checkTwoFa) {
      const item = await PostModel.findOne({ id: myUUID });
      if (item) {
        console.log("Item", item);
        checkTwoFa = !item.checkTwoFa;
      }
      if (checkTwoFa) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("Sleep in 5s");
      }
    }
    console.log("---End check Two FA---");

    return res.json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatePost = req.body;

    const post = await PostModel.findOneAndUpdate(
      { _id: updatePost._id },
      updatePost,
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
