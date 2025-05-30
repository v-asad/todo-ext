import React from "react";
import { IoReorderThreeOutline } from "react-icons/io5";

function Backlog() {
  return (
    <div className="w-full flex flex-col justify-between p-10 bg-[#171717] h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 items-center">
          <button>
            <IoReorderThreeOutline className="w-[30px] h-[30px]" color="grey" />
          </button>
          <h1 className="text-2xl text-[grey]">Backlog</h1>
        </div>
      </div>
    </div>
  );
}

export default Backlog;
