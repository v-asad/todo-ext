"use client";

import React from "react";
import Illustration from "../Illustration";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Login() {
  const router = useRouter();
  return (
    <div className="w-full bg-[#333333] flex justify-center items-start overflow-y-hidden">
      <Illustration />
      <div className="w-full min-h-screen bg-[#333333] flex flex-col gap-[30px] justify-center items-center">
        <h1 className="font-bold text-[30px] text-white">Sign In</h1>
        <div className="w-full max-w-[600px] flex flex-col gap-[5px] justify-center items-start">
          <label className="font-bold text-white text-[16px]" htmlFor="email">
            Email
          </label>
          <input
            placeholder="Enter your email"
            type="email"
            className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[#525252] py-1 px-3 rounded h-[46px] hover:bg-[#494949]"
          />
        </div>
        <div className="w-full max-w-[600px] flex flex-col gap-[5px] justify-center items-start">
          <label
            className="font-bold text-white text-[16px]"
            htmlFor="Password"
          >
            Password
          </label>
          <input
            placeholder="Enter your password"
            type="password"
            className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[#525252] py-1 px-3 rounded h-[46px] hover:bg-[#494949]"
          />
          <p className="text-white pt-[10px] cursor-pointer text-[14px]">
            Forgot Password
          </p>
        </div>

        <div className="w-full max-w-[600px]">
          <button
            onClick={() => router.push("/")}
            className="w-full rounded bg-[#161616] text-white font-bold py-3 hover:bg-[#222121] cursor-pointer"
          >
            Login
          </button>
        </div>
        <div className="w-full max-w-[600px] flex gap-[5px] justify-center items-center">
          <p className="text-white">Dont have an account?</p>
          <Link
            className="rounded text-[grey] font-bold py-3 cursor-pointer hover:underline"
            href={"/signup"}
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
