import express from "express";
import { getAsteroids } from "../controllers/asteroidsController";

const router = express.Router();
router.get("/asteroids", getAsteroids);

export default router;
