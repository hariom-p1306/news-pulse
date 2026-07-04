import express from "express";

import {
    triggerIngestion,
    getJobStatus
} from "../services/ingestService.js";

const router = express.Router();

router.post("/trigger", triggerIngestion);

router.get("/status/:jobId", getJobStatus);

export default router;