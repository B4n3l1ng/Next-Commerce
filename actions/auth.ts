'use server';

import { createAuthSession, createUser, verifyExistance, verifyPassword } from '@/lib/auth';
import { redirect } from 'next/navigation';

const PASSWORD_REG_EX: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export async function signUpAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const name = formData.get('name') as string;
  const password = formData.get('password') as string;

  const errors: string[] = [];

  if (!email.includes('@')) {
    errors.push('Please enter a valid email address.');
  }

  if (!PASSWORD_REG_EX.test(password)) {
    errors.push('Password must have at least 8 characters, one uppercase letter, one lower case letter, a number and a special character.');
  }

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  const doesUserExist = await verifyExistance(email);
  if (!doesUserExist) {
    try {
      const newUser = await createUser(email, name, password);
      await createAuthSession(newUser._id);
    } catch (error) {
      console.log(error);
      return {
        errors: ['There was an internal server error. Please try again later!'],
      };
    }
    redirect('/profile');
  } else {
    return {
      errors: ['User already exists.'],
    };
  }
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const existingUser = await verifyExistance(email);

  if (!existingUser) {
    return {
      errors: ['Could not authenticate user, please check your credentials.'],
    };
  }

  const isValidPassword = verifyPassword(password, existingUser.hashedPassword);
  if (!isValidPassword) {
    return {
      errors: ['Could not authenticate user, please check your credentials.'],
    };
  }

  await createAuthSession(existingUser.id);
  redirect('/profile');
}

export async function auth(mode: string, prevState: any, formData: FormData) {
  if (mode === 'login') {
    return login(prevState, formData);
  }
  return signUpAction(prevState, formData);
}
