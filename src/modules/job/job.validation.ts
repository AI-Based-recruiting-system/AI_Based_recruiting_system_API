import Joi from "joi";
import { JobCreatePayload } from "src/common/interfaces";

export const createMenuValidation = (data: JobCreatePayload): Joi.ValidationResult<JobCreatePayload> => {
  const schema = Joi.object<JobCreatePayload, true>({
  title: Joi.string()
    .min(3) // Ensures title has at least 3 characters
    .max(100) // Optional: limit to 100 characters
    .required(),
  description: Joi.string()
    .min(10) // Minimum length for description
    .required(),

  location: Joi.string()
    .required(),

  type: Joi.string()
    .valid('Full-time', 'Part-time', 'Contract', 'Internship') // Only allow specific types
    .required(),

  skillsRequired: Joi.string()
    .required(),

  experiencedLevel: Joi.number()
    .integer()
    .min(0)
    .max(5) // Assuming experience level is from 0 (entry-level) to 5 (senior)
    .required(),

  companyName: Joi.string()
    .min(3)
    .max(100)
    .required(),

  salary: Joi.string()
    .min(5)
    .required(),

  applicationDeadline: Joi.date()
    .greater('now') // Ensure the deadline is in the future
    .required(),

  resume: Joi.object()
    .keys({
      name: Joi.string().required(), // Ensure the file has a name
      size: Joi.number().less(5 * 1024 * 1024), // Max size 5MB
      type: Joi.string().valid('application/pdf').required(), // Only allow PDF files
    })
    .optional(),

    
  });

  return schema.validate(data);
};
