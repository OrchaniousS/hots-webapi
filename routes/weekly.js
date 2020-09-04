import express from "express";
import { getWeekly } from "../controllers/weekly.js";

const router = express.Router();

router.get("/week", getWeekly);

export default router;
