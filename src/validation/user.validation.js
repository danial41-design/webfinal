import Joi from "joi";

export const updateProfileSchema = Joi.object({
    username: Joi.string().min(3).max(40).optional(),
    email: Joi.string().email().optional()
}).min(1);
