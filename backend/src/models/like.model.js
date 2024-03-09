import mongoose from "mongoose";
import { Schema } from "mongoose";

const likeSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
