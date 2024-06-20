import { Schema, model } from 'mongoose';
import { CartSchema } from './types';

const cartSchema = new Schema<CartSchema>({
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Cart = model('product', cartSchema);

export default Cart;
