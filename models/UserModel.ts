import { Schema, model, models } from 'mongoose';
import { UserSchema } from './types';

const userSchema = new Schema<UserSchema>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    hashedPassword: {
      type: String,
      trim: true,
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: 'Cart',
    },
  },
  { timestamps: true }
);

const User = models.User || model('User', userSchema);

export default User;
