import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().max(80).required(),
    description: Joi.string().max(500).allow("").optional(),
    status: Joi.string().valid("todo", "doing", "done").optional(),
    dueDate: Joi.date().iso().allow(null).optional()
});
