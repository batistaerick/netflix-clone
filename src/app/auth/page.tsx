'use client';
import Input from '@/components/Input';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function Auth() {
  const router = useRouter();
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

  const login = useCallback(async () => {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    })
      .then(() => router.push('/'))
      .catch((error) => console.error(error));
  }, [email, password]);

  const register = useCallback(async () => {
    await axios
      .post('/api/register', {
        email,
        name,
        password,
      })
      .then(login)
      .catch((error) => console.error(error));
  }, [email, password, name, login]);

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
                    setName(String(event.currentTarget.value))
                  }
                  type="text"
                  value={name}
                />
              )}
              <Input
                id="email"
                label="Email"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setEmail(String(event.currentTarget.value))
                }
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Password"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setPassword(String(event.currentTarget.value))
                }
                type="password"
                value={password}
              />
            </div>
            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center justify-center gap-4 mt-8">
              <div
                className={`
                  w-10 h-10 bg-white rounded-full
                  flex items-center justify-center
                  cursor-pointer hover:opacity-80 transition
                `}
                onClick={() => signIn('google', { callbackUrl: '/' })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className={`
                  w-10 h-10 bg-white rounded-full
                  flex items-center justify-center
                  cursor-pointer hover:opacity-80 transition
                `}
                onClick={() => signIn('github', { callbackUrl: '/' })}
              >
                <FaGithub size={30} />
              </div>
            </div>
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
