import Image from "next/image";
import React from "react";

function Illustration() {
  return (
    <div className="w-full h-screen bg-[black]/80 flex flex-col justify-center items-center gap-[30px]">
      <div className="w-full flex flex-col gap-[30px] items-center justify-center">
        <Image
          width={100}
          height={100}
          src={"/assets/illustration/logo.png"}
          alt="logo"
        />
        <h1 className="text-[40px] text-white">Microsoft To Do</h1>
      </div>
      <div className="w-full max-w-[400px]">
        <Image
          width={350}
          height={350}
          src={"/assets/illustration/welcome-center.png"}
          alt="welcomeleftimg"
        />
      </div>
    </div>
  );
}

export default Illustration;
