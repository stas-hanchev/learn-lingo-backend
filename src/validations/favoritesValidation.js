import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) =>
  !isValidObjectId(value) ? helpers.message('Invalid id format') : value;

export const teacherIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    teacherId: Joi.string().custom(objectIdValidator).required(),
  }),
};
