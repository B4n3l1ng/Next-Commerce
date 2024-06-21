import { connectDB } from '@/db/mongoose';
import bcrypt from 'bcryptjs';
import UserModel from '@/models/UserModel';
import Cart from '@/models/CartModel';
const SALT_ROUNDS = 12;
import { Lucia } from 'lucia';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';
import mongoose, { ObjectId } from 'mongoose';
import { cookies } from 'next/headers';

const adapter = new MongodbAdapter(mongoose.connection.collection('sessions'), mongoose.connection.collection('users'));

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}

  return result;
}

export async function destroySession() {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: ['Unauthorized!'],
    };
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function verifyExistance(email: String) {
  try {
    const connected = await connectDB();
    if (!connected) {
      return;
    }
    const existance = await UserModel.findOne({ email });
    if (existance) {
      return existance;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createUser(email: string, name: string, password: string) {
  try {
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newCart = await Cart.create({ items: [] });
    const newUser = await UserModel.create({ email, name, hashedPassword, cartId: newCart._id });
    await Cart.findByIdAndUpdate(newCart._id, { userId: newUser._id });
    return newUser;
  } catch (error) {
    console.log(error);
    return;
  }
}

export function verifyPassword(input: string, hashedPassword: string) {
  return bcrypt.compareSync(input, hashedPassword);
}
