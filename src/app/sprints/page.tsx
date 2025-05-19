import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";

function Sprints() {
  return (
    <div className="w-full flex flex-col justify-between p-10 bg-[black]/91 h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 items-center">
          <button>
            <RxHamburgerMenu className="w-[30px] h-[30px]" color="grey" />
          </button>
          <h1 className="text-2xl text-[grey]">Current Sprint</h1>
        </div>
      </div>
    </div>
  );
}

export default Sprints;
