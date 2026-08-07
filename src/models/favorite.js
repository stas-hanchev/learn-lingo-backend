import { model, Schema } from 'mongoose';

const favoriteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  },
  { timestamps: true },
);

favoriteSchema.index({ userId: 1, teacherId: 1 }, { unique: true });

export const Favorite = model('Favorite', favoriteSchema);
