import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const teacherIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    teacherId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const getTeachersSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(3).max(20).default(4),
    language: Joi.string().optional(),
    level: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    sortBy: Joi.string().valid("_id", "name", "surname", "rating", "price_per_hour", "lessons_done").default("_id"),
    sortOrder: Joi.string().valid("asc", "desc").default("asc"),
  }),
};
