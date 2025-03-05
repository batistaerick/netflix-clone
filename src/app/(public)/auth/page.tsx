'use client';
import Input from '@/components/Input';
import {
  signIn,
  useSession,
  type SessionContextValue,
  type SignInResponse,
} from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

export default function Auth() {
  const [isError, setIsError] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [variant, setVariant] = useState<string>('login');
  const { status }: SessionContextValue = useSession();

  useEffect((): void => {
    if (status === 'authenticated') {
      redirect('/profiles');
    }
  });

  const toggleVariant: () => void = useCallback(
    (): void =>
      setVariant((currentVariant: string): 'login' | 'register' =>
        currentVariant === 'login' ? 'register' : 'login'
      ),
    []
  );

  const login: () => Promise<void> = useCallback(async (): Promise<void> => {
    const response: SignInResponse | undefined = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      setIsError(true);
    }
  }, [email, password]);

  const register: () => Promise<void> = useCallback(async (): Promise<void> => {
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, name, password }),
    })
      .then(login)
      .catch((error: unknown): void => console.error(error));
  }, [email, password, name, login]);

  async function onKeyDown(
    event: KeyboardEvent<HTMLInputElement>
  ): Promise<void> {
    if (event.key === 'Enter') {
      if (variant === 'login') {
        await login();
      } else {
        await register();
      }
    }
  }

  if (status === 'loading' || status === 'authenticated') {
    return <div />;
  }

  return (
    <div className="relative h-screen w-screen bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="h-full w-full bg-black lg:bg-black/50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="Logo" width={120} height={120} />
        </nav>
        <div className="flex justify-center">
          <div className="lg: mt-2 w-full max-w-md self-center rounded-md bg-black/75 px-16 py-16 lg:w-2/5">
            <h2 className="mb-8 text-4xl font-semibold text-white">
              {variant === 'login' ? 'Sign in' : 'Sign up'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="email"
                  label="Username"
                  type="text"
                  value={name}
                  onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                    setName(String(event.currentTarget.value))
                  }
                />
              )}
              <div
                className={`${isError && 'rounded-md border border-red-400'}`}
              >
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                    setEmail(String(event.currentTarget.value))
                  }
                />
              </div>
              <div
                className={`${isError && 'rounded-md border border-red-400'}`}
              >
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event: ChangeEvent<HTMLInputElement>): void =>
                    setPassword(String(event.currentTarget.value))
                  }
                  onKeyDown={onKeyDown}
                />
              </div>
              {isError && <div>Invalid email or password!</div>}
            </div>
            <button
              className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="mt-8 flex flex-row items-center justify-center gap-4">
              <FcGoogle
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80"
                onClick={(): Promise<SignInResponse | undefined> =>
                  signIn('google', { callbackUrl: '/profiles' })
                }
                size={30}
              />
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80">
                <FaGithub
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black transition hover:opacity-80"
                  onClick={(): Promise<SignInResponse | undefined> =>
                    signIn('github', { callbackUrl: '/profiles' })
                  }
                  size={30}
                />
              </div>
            </div>
            <p className="mt-12 text-neutral-500">
              {variant === 'login'
                ? 'New to Netflix?'
                : 'Already have an account?'}
              <button
                className="ml-1 cursor-pointer text-white hover:underline"
                onClick={toggleVariant}
              >
                {variant === 'login' ? 'Sign up now.' : 'Login.'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
