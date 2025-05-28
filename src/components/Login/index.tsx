import Image from "next/image";
import React from "react";
import Illustration from "../Illustration";

function Login() {
  return (
    <div className="w-full flex justify-center items-start overflow-y-hidden">
      <Illustration />
      <div className="w-full h-screen bg-[black]/80 flex flex-col gap-[30px] justify-center items-center">
        <h1 className="font-bold text-[30px] text-white">Sign In</h1>
        <div className="w-full max-w-[500px] flex flex-col gap-[5px] justify-center items-start">
          <label className="font-bold text-white text-[16px]" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[grey]/40 py-1 px-3 rounded h-[46px] hover:bg-[grey]/30"
          />
        </div>
        <div className="w-full max-w-[500px] flex flex-col gap-[5px] justify-center items-start">
          <label
            className="font-bold text-white text-[16px]"
            htmlFor="Password"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[grey]/40 py-1 px-3 rounded h-[46px] hover:bg-[grey]/30"
          />
          <p className="text-white pt-[10px] cursor-pointer text-[14px]">
            Forgot Password
          </p>
        </div>

        <div className="w-full max-w-[500px]">
          <button className="w-full rounded bg-[black]/60 text-white font-bold py-3 hover:bg-[black]/40 cursor-pointer">
            Login
          </button>
        </div>
        <div className="w-full max-w-[500px] flex gap-[5px] justify-center items-center">
          <p className="text-white">Dont have an account?</p>
          <button className="rounded text-[white]/60 font-bold py-3 cursor-pointer hover:underline">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
