'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }
    const payload = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    try {
      const response = await axios.post('http://localhost:8080/users/signup', {
        name: `${firstName} ${lastName}`,
        email: email,
        password: password,
      });

      setFormData(payload);
      toast.success(response.data.message || 'Signup successful!');
      router.push('/login');
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          toast.error(
            'This email is already registered. Please use a different email or try logging in.',
          );
        } else {
          toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center rounded-lg shadow-lg overflow-hidden w-full">
      <Toaster position="top-right" />
      <div className="w-full min-h-screen bg-[#333333] text-white p-8 flex flex-col justify-center items-center gap-6">
        <Image src="/assets/logo.png" alt="Welcome" width={200} height={200} className="mb-2" />
        <h1 className="text-white text-6xl font-bold">MicroSoft To Do</h1>
      </div>
      <div className="w-full bg-[#333333] p-8 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Register Here</h2>
        <form className="mb-8 w-[600px]" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="firstName" className="block text-white text-sm font-bold mb-1 ">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your First Name"
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px] placeholder:text-[#8795a0] placeholder:text-[14px] text-white"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lastName" className="block text-white text-sm font-bold mb-1 ">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your Last Name"
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px] placeholder:text-[#8795a0] placeholder:text-[14px] text-white"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-1 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px] placeholder:text-[#8795a0] placeholder:text-[14px] text-white"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-1 ">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px] placeholder:text-[#8795a0] placeholder:text-[14px] text-white"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-white text-sm font-bold mb-1 ">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px] placeholder:text-[#8795a0] placeholder:text-[14px] text-white"
            />
          </div>

          <div className="flex items-center justify-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#161616] hover:bg-[#222121] text-[grey] font-bold py-3 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-60"
            >
              Sign Up
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-2xl mt-8">
            <p className="text-white font-bold">Already have Account?</p>
            <Link href="/login" className="text-[#8795a0] hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
