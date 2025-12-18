import express from "express";
import roleController from "./role.controller";
const router = express.Router();
import { jwtTokenMiddleware } from "src/middlewares/jwtToken.middleware";

router.route("/").get(roleController.getAllRoles);
router.route("/create").post( roleController.create);
router.use(jwtTokenMiddleware)
router.route("/:id").get( roleController.getRole)
.put( roleController.update)
.patch( roleController.updateRole)
.delete( roleController.delete)
export default router; 