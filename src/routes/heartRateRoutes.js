import express from "express";
import {
  upload,
  processHeartRateData,
  getHeartRateData,
} from "../controllers/heartRateController.js";

const router = express.Router();

router.post("/heart-rate", upload.single("file"), processHeartRateData);

router.get("/heart-rate", getHeartRateData);

export default router;
