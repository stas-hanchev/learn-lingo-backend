import createHttpError from 'http-errors';
import { Favorite } from '../models/favorite.js';
import { Teacher } from '../models/teacher.js';

export const getFavorites = async (req, res) => {
  const favorites = await Favorite.find({ userId: req.user._id }).populate('teacherId');
  res.status(200).json(favorites.map((f) => f.teacherId));
};

export const addFavorite = async (req, res) => {
  const { teacherId } = req.params;

  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw createHttpError(404, 'Teacher not found');

  try {
    await Favorite.create({ userId: req.user._id, teacherId });
  } catch (err) {
    if (err.code !== 11000) throw err; // 11000 = вже в обраних, ігноруємо
  }

  res.status(201).json({ message: 'Added to favorites' });
};

export const removeFavorite = async (req, res) => {
  const { teacherId } = req.params;
  await Favorite.deleteOne({ userId: req.user._id, teacherId });
  res.status(204).send();
};
