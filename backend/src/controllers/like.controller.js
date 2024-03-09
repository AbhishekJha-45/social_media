import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { APiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const createPostLike = asyncHandler(async (req, res) => {
  try {
    // get post id from request body
    const { postId } = req.body;
    if (!postId) {
      return res
        .status(400)
        .json(new APiResponse(400, "post id is required", null));
    }
    // get user id from request object
    const userId = req.user._id;
    // check if user has already liked the post
    const like = await Like.findOne({ post: postId, likedBy: userId });
    // if user has already liked the post, return error
    if (like) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }
    // create new like
    const newLike = await Like.create({ post: postId, likedBy: userId });
    // return success response
    return res.status(201).json(new APiResponse(201, "Like created", newLike));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});

const deletePostLike = asyncHandler(async (req, res) => {
  // get post id from request body
  const { postId } = req.body;
  if (!postId) {
    throw new ApiError(400, "post id is required");
  }
  // get user id from request object
  const userId = req.user._id;
  // check if user has already liked the post
  const like = await Like.findOne({ post: postId, likedBy: userId });
  // if user has not liked the post, return error
  if (!like) {
    return res
      .status(400)
      .json(new ApiError(400, "You have not liked this post"));
  }
  // delete like
  await Like.findByIdAndDelete(like._id);
  // return success response
  return res
    .status(200)
    .json(new APiResponse(200, "Like deleted successfully", null));
});

const createCommentLike = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.body;
    if (!commentId) {
      const error = new ApiError(400, "Comment id is required");
      return res.status(400).json({
        data: null,
        success: false,
        errors: [{ message: error.message }],
      });
    }
    const userId = req.user._id;
    const like = await Like.findOne({ comment: commentId, likedBy: userId });
    if (like) {
      const error = new ApiError(400, "You have already liked this comment");
      return res.status(400).json({
        data: null,
        success: false,
        errors: [{ message: error.message }],
      });
    }
    const newLike = await Like.create({ comment: commentId, likedBy: userId });
    return res.status(201).json(new APiResponse(201, "Like created", newLike));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});

const deleteCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.body;
  if (!commentId) {
    const error = new ApiError(400, "Comment id is required");
    return res.status(400).json({
      data: null,
      success: false,
      errors: [{ message: error.message }],
    });
  }
  const userId = req.user._id;
  const like = await Like.findOne({ comment: commentId, likedBy: userId });
  if (!like) {
    const error = new ApiError(400, "You have not liked this comment");
    return res.status(400).json({
      data: null,
      success: false,
      errors: [{ message: error.message }],
    });
  }
  await Like.findByIdAndDelete(like._id);
  return res
    .status(200)
    .json(new APiResponse(200, "Like deleted successfully", null));
});
const createTweetLike = asyncHandler(async (req, res) => {
  try {
    const { tweetId } = req.body;
    if (!tweetId) {
      const error = new ApiError(400, "Tweet id is required");
      return res.status(400).json({
        data: null,
        success: false,
        errors: [{ message: error.message }],
      });
    }
    const userId = req.user._id;
    const like = await Like.findOne({ tweet: tweetId, likedBy: userId });
    if (like) {
      const error = new ApiError(400, "You have already liked this tweet");
      return res.status(400).json({
        data: null,
        success: false,
        errors: [{ message: error.message }],
      });
    }
    const newLike = await Like.create({ tweet: tweetId, likedBy: userId });
    return res
      .status(201)
      .json(new APiResponse(201, "Like created successfully", newLike));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});
const deleteTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.body;
  if (!tweetId) {
    const error = new ApiError(400, "Tweet id is required");
    return res.status(400).json({
      data: null,
      success: false,
      errors: [{ message: error.message }],
    });
  }
  const userId = req.user._id;
  const like = await Like.findOne({ tweet: tweetId, likedBy: userId });
  if (!like) {
    const error = new ApiError(400, "You have not liked this tweet");
    return res.status(400).json({
      data: null,
      success: false,
      errors: [{ message: error.message }],
    });
  }
  await Like.findByIdAndDelete(like._id);
  return res
    .status(200)
    .json(new APiResponse(200, "Like deleted successfully", null));
});
//getting all likes
const getAllLikes = asyncHandler(async (req, res) => {
  try {
    const { postId, commentId, tweetId } = req.body;
    // if (!(postId && commentId && tweetId)) {
    //   return res.status(400).json(new APiResponse(400, "Invalid request", null));
    // }
    if (postId) {
      const postLikes = await Like.find({ post: postId });
      if (!postLikes || postLikes.length === 0) {
        return res
          .status(404)
          .json(new APiResponse(404, "No likes found", null));
      }
      return res
        .status(200)
        .json(new APiResponse(200, "Likes fetched successfully", postLikes));
    } else if (commentId) {
      const commentLikes = await Like.find({ comment: commentId });
      if (!commentLikes || commentLikes.length === 0) {
        return res
          .status(404)
          .json(new APiResponse(404, "No likes found", null));
      }
      return res
        .status(200)
        .json(new APiResponse(200, "Likes fetched successfully", commentLikes));
    } else if (tweetId) {
      const tweetLikes = await Like.find({ tweet: tweetId });
      if (!tweetLikes || tweetLikes.length === 0) {
        return res
          .status(404)
          .json(new APiResponse(404, "No likes found", null));
      }
      return res
        .status(200)
        .json(new APiResponse(200, "Likes fetched successfully", tweetLikes));
    }
    return res.status(400).json(new APiResponse(400, "Invalid request", null));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
});

const getpostLikes = asyncHandler(async (req, res) => {
  try {
    const { postId } = req.body;
    const postLikes = await Like.find({ post: postId });
    if (!postLikes || postLikes.length === 0) {
      return res.status(404).json(new APiResponse(404, "No likes found", null));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Likes fetched successfully", postLikes));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Failed to get post Likes"));
  }
});
const getCommentLikes = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.body;
    const commentLikes = await Like.find({ comment: commentId });
    if (!commentLikes || commentLikes.length === 0) {
      return res.status(404).json(new APiResponse(404, "No likes found", null));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Likes fetched successfully", commentLikes));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Failed to get comment Likes"));
  }
});

const getTweetLikes = asyncHandler(async (req, res) => {
  try {
    const { tweetId } = req.body;
    const tweetLikes = await Like.find({ tweet: tweetId });
    if (!tweetLikes || tweetLikes.length === 0) {
      return res.status(404).json(new APiResponse(404, "No likes found", null));
    }
    return res
      .status(200)
      .json(new APiResponse(200, "Likes fetched successfully", tweetLikes));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, error.message || "Failed to get tweet Likes"));
  }
});
export {
  createPostLike,
  deletePostLike as deletepostLike,
  createCommentLike,
  deleteCommentLike,
  createTweetLike,
  deleteTweetLike,
  getAllLikes,
  getpostLikes,
  getCommentLikes,
  getTweetLikes,
};
