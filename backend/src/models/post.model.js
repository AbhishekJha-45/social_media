import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    caption: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
postSchema.plugin(mongooseAggregatePaginate);
export const Post = mongoose.model("Post", postSchema);
