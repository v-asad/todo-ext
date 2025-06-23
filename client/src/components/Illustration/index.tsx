import Image from 'next/image';
import React from 'react';

function Illustration() {
  return (
    <div className="w-full min-h-screen bg-[#333333] flex flex-col justify-center items-center gap-7.5">
      <div className="w-full flex flex-col gap-6 items-center justify-center">
        <div className="relative w-63 h-38">
          <Image className="object-contain" fill src={'/assets/illustration/logo.png'} alt="logo" />
        </div>
        <h1 className="text-6xl text-white font-bold">Microsoft To Do</h1>
      </div>
    </div>
  );
}

export default Illustration;
