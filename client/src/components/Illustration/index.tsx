import Image from "next/image";
import React from "react";

function Illustration() {
  return (
    <div className="w-full min-h-screen bg-[#333333] flex flex-col justify-center items-center gap-[30px]">
      <div className="w-full flex flex-col gap-[24px] items-center justify-center">
        <Image
          width={200}
          height={200}
          src={"/assets/illustration/logo.png"}
          alt="logo"
        />
        <h1 className="text-[60px] text-white font-bold">Microsoft To Do</h1>
      </div>
    </div>
  );
}

export default Illustration;
