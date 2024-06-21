import { Schema, model, models } from 'mongoose';
import { ProductSchema } from './types';

const productSchema = new Schema<ProductSchema>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: String,
        enum: ['clothing', 'technology', 'jewelry', 'misc', 'male', 'female', 'other', 'art'],
        required: true,
      },
    ],
    image: {
      type: String,
      default: 'https://res.cloudinary.com/dtiihknqe/image/upload/v1718902034/placeholder-images-image_large_x9132u.webp',
    },
  },
  { timestamps: true }
);

const Product = models.Product || model('Product', productSchema);

export default Product;
