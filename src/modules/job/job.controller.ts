import { NextFunction, Request, Response } from "express";
 
import jobService from "./job.service";
import { SuccessCreatedResponse } from "src/common/utils";
import { JOB_MESSAGE_CONSTANT } from "src/common/constants";
import { IAuthSignup } from "src/common/interfaces";
import { catchAsyncHandler } from "src/helpers";

export class jobController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const image = req.file?.filename
    const job = await jobService.create(req.body, image);

    return new SuccessCreatedResponse<IAuthSignup>(JOB_MESSAGE_CONSTANT.JOB_POST_CREATED_SUCCESSFULLY, job).sendResponse(res);
  }
  async getAllJobPost(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Number(req.query.limit) || 20);
    const user = await jobService.getAllJobPost(page,limit);
    return new SuccessCreatedResponse<IAuthSignup>(JOB_MESSAGE_CONSTANT.JOB_FETCHED_SUCCESSFULLY, user).sendResponse(res);
  }
} 

export default {
  create: catchAsyncHandler(new jobController().create),
  getAllJob: catchAsyncHandler(new jobController().getAllJobPost)
};
