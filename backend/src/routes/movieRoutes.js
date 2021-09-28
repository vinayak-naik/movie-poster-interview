import express from "express";
import {protect} from "../middleware/authMiddleware";

const router = express.Router();
import {
  getPopular,
  getFav,
  getLatest,
  createFav,
} from "../controllers/movieController";

router.route("/").get(getPopular)
router.route("/latest").get(getLatest)
router.route("/fav").get(getFav).post(createFav);

export default router;
