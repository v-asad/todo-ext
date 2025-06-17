'use client';

import React, { useState } from 'react';
import Illustration from '../Illustration';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginService } from '@/app/services/loginService';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      toast.error('Email and password required');
      return;
    }
    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await loginService(payload);
      localStorage.setItem('token', response.token);
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error('Email or password incorrect');
    }
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
      <div className="w-full min-h-screen bg-[#333333] flex flex-col gap-[30px] justify-center items-center">
        <h1 className="font-bold text-[30px] text-white">Sign In</h1>

        <Toaster position="top-center" />

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
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[#525252] py-1 px-3 rounded h-[46px] hover:bg-[#494949]"
            />
          </div>

          <div className="w-full max-w-[600px] flex flex-col gap-[5px] justify-center items-start ">
            <label className="font-bold text-white text-[16px]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleChange}
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
