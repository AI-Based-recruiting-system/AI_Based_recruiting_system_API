import express from "express";
import jobController from "./job.controller";
const router = express.Router();
import { jwtTokenMiddleware } from "src/middlewares/jwtToken.middleware";
import { upload } from "src/helpers/uploadImg";

router.route("/").get(jobController.getAllJob);
router.use(jwtTokenMiddleware)
router.route("/create").post( upload, jobController.create);
export default router; 