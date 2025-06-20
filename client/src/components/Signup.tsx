'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signup } from '@/services/signupService';

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type SignupError = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  general: string;
};

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<SignupError>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    });

    const { firstName, lastName, email, password, confirmPassword } = formData;
    let hasError = false;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    };

    if (!firstName) {
      newErrors.firstName = 'First name is required';
      hasError = true;
    }
    if (!lastName) {
      newErrors.lastName = 'Last name is required';
      hasError = true;
    }
    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!email.trim()) {
      newErrors.email = 'Email cannot be empty or just spaces';
      hasError = true;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Invalid email format';
        hasError = true;
      }
    }
    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
      if (!passwordRegex.test(password)) {
        newErrors.password =
          'Password must be at least 6 characters and include one uppercase letter, one lowercase letter, one number, and one special character.';
        hasError = true;
      }
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      hasError = true;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }
    if (hasError) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const response = await signup({
      firstName,
      lastName,
      email,
      password,
    });

    if (!response.success) {
      setErrors((prev) => ({ ...prev, general: response.message }));
      setIsLoading(false);
      return;
    }

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    });
    toast.success(response.message);
    router.push('/login');
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center rounded-lg shadow-lg overflow-hidden w-full max-h-screen">
      <div className="w-full min-h-screen bg-[#333333] text-white p-8 flex flex-col justify-center items-center gap-6">
        <Image src="/assets/logo.png" alt="Welcome" width={200} height={200} className="mb-2" />
        <h1 className="text-white text-6xl font-bold">MicroSoft To Do</h1>
      </div>
      <div className="w-full bg-[#333333] p-8 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Register Here</h2>
        <form className="mb-8 w-[600px]" onSubmit={handleSubmit}>
          <div className="mb-2 h-22">
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
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-12 placeholder:text-[#8795a0] placeholder:text-sm text-white"
            />
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
          </div>

          <div className="mb-2 h-22">
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
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-12 placeholder:text-[#8795a0] placeholder:text-sm text-white"
            />
            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
          </div>

          <div className="mb-2 h-22">
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
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-12 placeholder:text-[#8795a0] placeholder:text-sm text-white"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-2 h-24">
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
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-12 placeholder:text-[#8795a0] placeholder:text-sm text-white"
            />
            {errors.password && <p className="text-red-400 text-xs my-1">{errors.password}</p>}
          </div>

          <div className="mb-2 h-22">
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
              className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-12 placeholder:text-[#8795a0] placeholder:text-sm text-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {errors.general && (
            <p className="text-red-400 text-xs text-center mt-1">{errors.general}</p>
          )}

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
