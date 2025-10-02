import Joi from "joi";

// Coach Validator
export const CoachSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Coach ID is required",
    "any.required": "Coach ID is required",
  }),
  name: Joi.string().min(2).max(50).required().messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),
  title: Joi.string().min(5).max(100).required(),
  specialization: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.min": "At least one specialization is required",
  }),
  rating: Joi.number().min(0).max(5).required(),
  reviewCount: Joi.number().min(0).required(),
  tags: Joi.array().items(Joi.string()).required(),
  isAvailable: Joi.boolean().required(),
  bio: Joi.string().min(10).max(1000).required(),
  experience: Joi.string().required(),
  hourlyRate: Joi.number().min(0).required(),
  profilePicture: Joi.any().required(),
  coverPhoto: Joi.any().optional(),
});

// Session Validator
export const SessionSchema = Joi.object({
  id: Joi.string().required(),
  coachId: Joi.string().required(),
  userId: Joi.string().required(),
  problem: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  scheduledTime: Joi.date().greater("now").required(),
  status: Joi.string().valid("upcoming", "completed", "cancelled").required(),
  rating: Joi.number().min(1).max(5).optional(),
  review: Joi.string().optional(),
});

// Review Validator
export const ReviewSchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  userName: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().required(),
  date: Joi.date().required(),
});
