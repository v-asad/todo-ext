'use client';

import React, { useState } from 'react';
import Illustration from '../Illustration';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/app/services/loginService';
import toast from 'react-hot-toast';

function Login() {
  const router = useRouter();

  type FormData = {
    email: string;
    password: string;
  };
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailPasswordRequired, setEmailPasswordRequired] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;
    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!emailTrimmed || !password) {
      setEmailPasswordRequired('Email and password required');
      return;
    }
    if (!emailRegex.test(emailTrimmed)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 6 characters long and include uppercase, lowercase, number, and special character',
      );
      return;
    }
    const payload = {
      email: emailTrimmed,
      password: password,
    };

    const response = await login(payload);
    if ('error' in response) {
      setLoading(false);
      toast.error(response.error);
      return;
    }
    setLoading(true);
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full bg-[#333333] flex justify-center items-start overflow-y-hidden">
      <Illustration />
      <div className="w-full min-h-screen bg-[#333333] flex flex-col gap-7 justify-center items-center">
        <h1 className="font-bold text-3xl text-white">Sign In</h1>
        {emailPasswordRequired && <p className="text-red-500 text-sm">{emailPasswordRequired}</p>}

        <form
          className="w-full flex flex-col gap-8 justify-center items-center"
          onSubmit={handleLogin}
        >
          <div className="w-full max-w-[600px] flex flex-col gap-1 justify-center items-start ">
            <label className="font-bold text-white text-base" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-sm bg-[#525252] py-1 px-3 rounded h-12 hover:bg-[#494949]"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div className="w-full max-w-[600px] flex flex-col gap-1 justify-center items-start ">
            <label className="font-bold text-white text-base" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-sm bg-[#525252] py-1 px-3 rounded h-12 hover:bg-[#494949]"
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <p className="text-white pt-2.5 cursor-pointer text-sm">Forgot Password</p>
          </div>

          <div className="w-full max-w-[600px]">
            <button
              disabled={loading}
              type="submit"
              className="w-full rounded bg-[#161616] text-white font-bold py-3 hover:bg-[#222121] cursor-pointer"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="w-full max-w-[600px] flex gap-1 justify-center items-center">
            <p className="text-white">Don&apos;t have an account?</p>
            <Link
              className="rounded text-[grey] font-bold py-3 cursor-pointer hover:underline"
              href="/signup"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
