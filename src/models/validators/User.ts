import Joi from "joi";

// User Validator
export const UserSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(2).max(50).required(),
  role: Joi.string().valid("BasicUser", "PremiumUser").required(),
  profilePicture: Joi.string().optional(),
  sessionsRemaining: Joi.number().min(0).required(),
  packageType: Joi.string().required(),
});
