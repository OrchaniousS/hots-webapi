import express from "express";
import { getWeekly } from "../controllers/weekly.js";

const router = express.Router();

router.all("*", (req, res, next) => {
  var origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.get("/week", getWeekly);

export default router;
