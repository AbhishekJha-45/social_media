import { asyncHandler } from "../utils/asyncHandler.js";
import { Post } from "../models/post.model.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
const createNewPost = asyncHandler(async (req, res) => {
  try {
    const { title, caption } = req.body;
    if ([title, caption].some((field) => field?.trim() === "")) {
      res
        .status(400)
        .json(new APiResponse(400, "All fields are required", null));
    }

    const imageUpload = req.files.image[0]?.path;
    if (!imageUpload) {
      res.status(400).json(new APiResponse(400, "Image is required", null));
    }
    const uploadImageToCloudinary = await uploadToCloudinary(imageUpload);
    if (!uploadImageToCloudinary || uploadImageToCloudinary.length === 0) {
      res.status(400).json({ message: "Error uploading image" });
    }
    const userId = req.user._id;
    const createdPost = await Post.create({
      title,
      caption,
      image: uploadImageToCloudinary.url,
      owner: userId,
    });
    if (!createdPost) {
      res.status(400).json({ message: "Error creating post" });
    }
    return res.status(201).json({ message: "Post created", data: createdPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const deletePost = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "post id is required" });
    }
    const post = await Post.findByIdAndDelete(postId);
    if (!post || post.length === 0) {
      return res.status(400).json({ message: "post not found" });
    }
    return res.status(200).json({ message: "post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export { createNewPost, deletePost };
