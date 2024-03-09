import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createNewPost, deletePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPostLike,
  deletepostLike,
} from "../controllers/like.controller.js";
import { Post } from "../models/post.model.js";
const router = Router();

router.use(verifyJwt);
//new post creation
router
  .route("/new-post")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), createNewPost);

//send delete req for this route
router.route("/delete-post").delete(deletePost);

//   like routes for post
router.route("/new-post-like").post(createPostLike);
router.route("/delete-post-like").delete(deletepostLike);
export default router;
