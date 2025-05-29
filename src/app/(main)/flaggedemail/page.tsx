import React from "react";
import { CiFlag1 } from "react-icons/ci";

function flaggedemail() {
  return (
    <div className="w-full flex flex-col justify-between p-10 bg-[black]/91 h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 items-center">
          <button>
            <CiFlag1 className="w-[30px] h-[30px]" color="red" />
          </button>
          <h1 className="text-2xl text-[red]">Flagged email</h1>
        </div>
      </div>
    </div>
  );
}

export default flaggedemail;
