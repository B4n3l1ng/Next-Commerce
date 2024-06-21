import { Schema, model, models } from 'mongoose';
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

const Cart = models.Cart || model('Cart', cartSchema);

export default Cart;
