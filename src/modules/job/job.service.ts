import {Job } from "../../helpers";
import { JOB_MESSAGE_CONSTANT } from "../../common/constants";
import { BadRequestError} from "../../common/utils";
import { env } from "src/configs";
class JobServices {
  async create(reqBody: any, image:any): Promise<any> {
    try {  
      const experiencedLevel = parseInt(reqBody.experiencedLevel)
      const job = await Job.create({
        data: {...reqBody,experiencedLevel:experiencedLevel, image:image},
        select: {
          id: true,
        }
      });
      if (!job) {
        throw new BadRequestError(JOB_MESSAGE_CONSTANT.JOB_POST_CREATED_SUCCESSFULLY);
      }
      return job;
    } catch (error) {
      if (!error) throw new BadRequestError("Unexpected error occured"); 
    }
  }

  async getAllJobPost(page:any, limit:any): Promise<any> {
    try {
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      Job.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'asc' },
      }),
      Job.count(),
    ]);

    const mappedJob = jobs.map((j) => {
      const imageUrl = `${env.appConfig.APP_URL}/public/uploads/jobs/${j.image}`;
      return { ...j, image: imageUrl };
    });

    return {
      data:mappedJob,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  } catch (err) {
      if (!err) throw new BadRequestError("Unexpected error occured"); 
  }
  }
}

const JobService = new JobServices();
export default JobService;
