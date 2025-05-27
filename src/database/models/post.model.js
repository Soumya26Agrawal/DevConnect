// models/User.js
import mongoose from "mongoose";

// import bcrypt from "bcryptjs";
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  { timestamps: true }
);

// If the model already exists, use it; otherwise, create it
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
