'use client';
import Input from '@/components/Input';
import axios from 'axios';
import { ChangeEvent, useCallback, useState } from 'react';

export default function Auth() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [variant, setVariant] = useState<string>('login');

  const toggleVariant = useCallback(
    () =>
      setVariant((currentVariant) =>
        currentVariant === 'login' ? 'register' : 'login'
      ),
    []
  );

  const register = useCallback(async () => {
    try {
      const user = await axios.post('/api/register', {
        email,
        name,
        password,
      });
      console.log('Page:', user);
    } catch (error) {
      console.log(error);
    }
  }, [email, password, name]);

  return (
    <div
      className={`
        relative h-full w-full bg-[url('/images/hero.jpg')]
        bg-no-repeat bg-center bg-fixed bg-cover
      `}
    >
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img className="h-12" src="/images/logo.png" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div
            className={`
              bg-black bg-opacity-70 px-16 py-16 self-center mt-2
              lg:w-2/5 lg: max-w-md rounded-md w-full
            `}
          >
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Sign up'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="email"
                  label="Username"
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setName(event.currentTarget.value)
                  }
                  type="text"
                  value={name}
                />
              )}
              <Input
                id="email"
                label="Email"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.currentTarget.value)
                }
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Password"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.currentTarget.value)
                }
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'New to Netflix?'
                : 'Already have an account?'}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === 'login' ? 'Sign up now.' : 'Login.'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
