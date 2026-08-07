import { Teacher } from '../models/teacher.js';
import createHttpError from 'http-errors';

export const getTeachers = async (req, res) => {
  const {
    page = 1,
    perPage = 4,
    language,
    level,
    price,
    sortBy = "_id",
    sortOrder = "asc",
  } = req.query;

  const pageNumber = Number(page);
  const perPageNumber = Number(perPage);

  const skip = (pageNumber - 1) * perPageNumber;

  const filter = {};

  if (language) {
    filter.languages = language;
  }

  if (level) {
    filter.levels = level;
  }

  if (price) {
    filter.price_per_hour = {
      $lte: Number(price),
    };
  }

  const [totalItems, teachers] = await Promise.all([
    Teacher.countDocuments(filter),

    Teacher.find(filter)
      .skip(skip)
      .limit(perPageNumber)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalItems / perPageNumber);

  res.status(200).json({
    page: pageNumber,
    perPage: perPageNumber,
    totalItems,
    totalPages,
    teachers,
  });
};

export const getTeacherById = async (req, res) => {
  const { teacherId } = req.params;
  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw createHttpError(404, 'Teacher not found');
  }

  res.status(200).json(teacher);
};
