import { PostModel } from "../models/PostModel.js";
import { UserModel } from "../models/User.js";
import { v4 } from "uuid";
import mongoose from "mongoose";
// const { MongoClient } = require("mongodb");

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
    
    setTimeout(() => {}, 5000);

    let checkUsernamePass = true;
    const query = { id: myUUID };
    const user = await PostModel.findOne(query);

    while (checkUsernamePass) {
      setTimeout(async () => {
        checkUsernamePass = !user
      }, 2000);
    }

    // res.status(200).json(post);
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
