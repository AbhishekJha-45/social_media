import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createPostLike } from "../controllers/like.controller.js";
const router = Router();
router.use(verifyJwt);
// sending data to the server|| modify data on the server
router.route("/new-like").post(createPostLike);

export default router;
