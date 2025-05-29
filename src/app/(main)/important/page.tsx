"use client";

import { IoIosStarOutline } from "react-icons/io";

export default function Important() {
  return (
    <div className="w-full flex flex-col justify-between p-10 bg-[black]/91 h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 items-center">
          <button>
            <IoIosStarOutline className="w-[30px] h-[30px]" color="pink" />
          </button>
          <h1 className="text-2xl text-[pink]">Important</h1>
        </div>
      </div>
    </div>
  );
}
