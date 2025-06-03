import React from "react";
import { CiUser } from "react-icons/ci";

function assigned() {
  return (
    <div className="w-full flex flex-col justify-between p-10 bg-[#171717] h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 justify-start items-center">
          <button>
            <CiUser className="w-[30px] h-[30px]" color="green" />
          </button>
          <h1 className="text-2xl text-[green]">Assigned to me</h1>
        </div>
      </div>
    </div>
  );
}

export default assigned;
