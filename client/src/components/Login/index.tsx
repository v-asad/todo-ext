'use client';

import React, { useState } from 'react';
import Illustration from '../Illustration';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginService } from '@/app/services';

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email and password required');
      return;
    }

    try {
      const response = await loginService({ email: formData.email, password: formData.password });
      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (err) {
      console.error(err);
      setError('Email or password incorrect');
    }
  };

  return (
    <div className="w-full bg-[#333333] flex justify-center items-start overflow-y-hidden">
      <Illustration />
      <div className="w-full min-h-screen bg-[#333333] flex flex-col gap-[30px] justify-center items-center">
        <h1 className="font-bold text-[30px] text-white">Sign In</h1>

        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <form
          className="w-full flex flex-col gap-[30px] justify-center items-center"
          onSubmit={handleLogin}
        >
          <div className="w-full max-w-[600px] flex flex-col gap-[5px] justify-center items-start ">
            <label className="font-bold text-white text-[16px]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[#525252] py-1 px-3 rounded h-[46px] hover:bg-[#494949]"
            />
          </div>

          <div className="w-full max-w-[600px] flex flex-col gap-[5px] justify-center items-start ">
            <label className="font-bold text-white text-[16px]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[#525252] py-1 px-3 rounded h-[46px] hover:bg-[#494949]"
            />
            <p className="text-white pt-[10px] cursor-pointer text-[14px]">Forgot Password</p>
          </div>

          <div className="w-full max-w-[600px]">
            <button
              type="submit"
              className="w-full rounded bg-[#161616] text-white font-bold py-3 hover:bg-[#222121] cursor-pointer"
            >
              Login
            </button>
          </div>

          <div className="w-full max-w-[600px] flex gap-[5px] justify-center items-center">
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
