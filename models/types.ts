import { Types } from 'mongoose';

export interface UserSchema {
  name: String;
  email: String;
  hashedPassword: String;
  cartId: Types.ObjectId;
}

export interface ProductSchema {
  title: String;
  description: String;
  price: Number;
  tags: productTags[];
  image: String;
}

export interface CartSchema {
  items: Types.ObjectId[];
  userId: Types.ObjectId;
}

//Product Tags enum
export enum productTags {
  clothing = 'clothing',
  technology = 'technology',
  jewelry = 'jewelry',
  misc = 'misc',
  male = 'male',
  female = 'female',
  other = 'other',
  art = 'art',
}
