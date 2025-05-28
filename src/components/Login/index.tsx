import Image from "next/image";
import React from "react";
import Illustration from "../Illustration";

function Login() {
  return (
    <div className="w-full flex justify-center items-start overflow-y-hidden">
      <Illustration />
      <div className="w-full h-screen bg-[black]/80 flex flex-col gap-[30px] justify-center items-center">
        <h1 className="font-bold text-[30px] text-white">Sign In</h1>
        <div className="w-full max-w-[500px]">
          <label className="font-bold text-white text-[16px]" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[grey]/40 py-1 px-3 rounded h-[46px]"
          />
        </div>
        <div className="w-full max-w-[500px]">
          <label
            className="font-bold text-white text-[16px]"
            htmlFor="Password"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] bg-[grey]/40 py-1 px-3 rounded h-[46px]"
          />
        </div>
        <div className="w-full max-w-[500px]">
          <button className="w-full rounded bg-[black]/60 text-white py-3">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
