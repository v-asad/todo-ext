import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Signup = () => {
  return (
    <div className="flex items-center justify-center rounded-lg shadow-lg overflow-hidden w-full">
      <div className="w-full min-h-screen bg-[#333333] text-white p-8 flex flex-col justify-center items-center gap-6">
        <Image
          src="/assets/logo.png"
          alt="Welcome"
          width={200}
          height={200}
          className="mb-2"
        />
        <h1 className='text-white text-6xl font-bold'>MicroSoft To Do</h1>
      </div>
      <div className="w-full bg-[#333333] p-8 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Register Here</h2>
        <form className='mb-8 w-[600px]'>
          <div className="mb-2">
            <label htmlFor="name" className="block text-white text-sm font-bold mb-1 ">First Name</label>
            <input type="text" id="firstname" placeholder="Enter your First Name" className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px]  placeholder:text-[#8795a0] placeholder:text-[14px] text-white" />
          </div>
          <div className="mb-2">
            <label htmlFor="name" className="block text-white text-sm font-bold mb-1 ">Last Name</label>
            <input type="text" id="lastname" placeholder="Enter your Last Name" className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px]  placeholder:text-[#8795a0] placeholder:text-[14px] text-white" />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-1 ">Email</label>
            <input type="email" id="email" placeholder="user@example.com" className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px]  placeholder:text-[#8795a0] placeholder:text-[14px] text-white" />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-1 ">Password</label>
            <input type="password" id="password" placeholder="Enter Your Password" className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px]  placeholder:text-[#8795a0] placeholder:text-[14px] text-white " />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-white text-sm font-bold mb-1 ">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="Confirm Password" className="w-full bg-[#525252] hover:bg-[#494949] py-1 px-3 rounded h-[46px]  placeholder:text-[#8795a0] placeholder:text-[14px] text-white" />
          </div>
          <div className="flex items-center justify-center mt-8">
            <button type="submit" className="bg-[#161616] hover:bg-[#222121] text-[grey] font-bold py-3  rounded focus:outline-none focus:shadow-outline w-full">Sign Up</button>
          </div>
          <div className="flex items-center justify-center gap-2 text-2xl mt-8">
            <p className='text-white font-bold'>Already have Account?</p>
            <Link href="/login" className="text-[#8795a0] hover:underline">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup; 