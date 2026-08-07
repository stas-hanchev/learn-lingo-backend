import { Router } from 'express';
import { celebrate } from 'celebrate';

import { getTeachers, getTeacherById } from '../controllers/teachersController.js';
import { teacherIdParamSchema, getTeachersSchema } from '../validations/teachersValidation.js';

const router = Router();

router.get('/teachers', celebrate(getTeachersSchema), getTeachers);

router.get('/teachers/:teacherId', celebrate(teacherIdParamSchema), getTeacherById);

export default router;
