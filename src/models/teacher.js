import { Schema } from 'mongoose';
import { model } from 'mongoose';

const LANGUAGE_LEVELS = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
];

const teacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    languages: {
      type: [String],
      required: true,
    },
    levels: {
      type: [String],
      enum: {
        values: LANGUAGE_LEVELS,
        message: '{VALUE} is not a valid language level',
      },
      required: true,
      validate: {
        validator: (levels) => levels.length > 0,
        message: 'At least one language level is required',
      },
    },
    rating: {
      type: Number,
      required: true,
    },
    reviews: [
      {
        reviewer_name: {
          type: String,
          required: true,
          trim: true,
        },

        reviewer_rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },

        comment: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    price_per_hour: {
      type: Number,
      required: true,
    },
    lessons_done: {
      type: Number,
      required: true,
    },
    avatar_url: {
      type: String,
      required: true,
    },
    lesson_info: {
      type: String,
      required: true,
    },
    conditions: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

teacherSchema.index({ languages: 'text', levels: 'text', price_per_hour: 1 });

export const Teacher = model('Teacher', teacherSchema);
