import express from "express";
import * as aiController from "../controllers/ai-controller.js";

const router = express.Router();

router.route("/").post(aiController.getReassurance);


export default router;
