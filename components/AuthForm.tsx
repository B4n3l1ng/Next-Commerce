'use client';

import { auth } from '@/actions/auth';
import Link from 'next/link';
import { useFormState } from 'react-dom';

interface Props {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: Props) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), { errors: [] });
  return (
    <>
      <h1 className="text-center my-4 text-3xl font-bold">Sign Up</h1>
      <form className="flex flex-col w-1/2 mx-auto bg-slate-700 p-5 text-white justify-between min-h-[33vh]" action={formAction}>
        <div className="flex flex-col flex-1 justify-center">
          <div className="flex flex-row w-full justify-between items-center mb-3">
            <label htmlFor="email" className="w-1/3">
              Email
            </label>
            <input type="text" name="email" id="email" required className="w-2/3 border-solid border-blue border-2 rounded-md text-black" />
          </div>
          {mode === 'signup' && (
            <div className="flex flex-row w-full justify-between items-center mb-3">
              <label htmlFor="name" className="w-1/3">
                Name
              </label>
              <input type="text" name="name" id="name" required className="w-2/3 border-solid border-blue border-2 rounded-md text-black" />
            </div>
          )}
          <div className="flex flex-row w-full justify-between items-center mb-3">
            <label htmlFor="password" className="w-1/3">
              Password
            </label>
            <input type="password" name="password" id="password" className="w-2/3 border-solid border-blue border-2 rounded-md text-black" />
          </div>
        </div>
        {formState?.errors && (
          <ul>
            {formState.errors.map((error: string) => (
              <li className="text-red-600" key={error}>
                {error}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-col items-center mt-4">
          <button className="bg-blue-600 w-1/2 text-white mt-4 mb-2 mx-auto border-solid rounded-lg p-1" type="submit">
            {mode === 'login' ? 'Login' : 'Create an account'}
          </button>
          <Link className="text-yellow-200 text-center hover:text-orange-700" href={mode === 'signup' ? '/login' : '/signup'}>
            {mode === 'signup' ? 'Login with an existing account.' : "Don't have an account? Create one here."}
          </Link>
        </div>
      </form>
    </>
  );
}
