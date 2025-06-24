import React from 'react';
import { IoReorderThreeOutline } from 'react-icons/io5';

function Backlog() {
  return (
    <div className="w-full flex flex-col justify-between items-start p-10 bg-[#171717] h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 justify-start items-center">
          <button>
            <IoReorderThreeOutline className="w-7.5 h-7.5" color="grey" />
          </button>
          <h1 className="text-2xl text-[grey]">Backlog</h1>
        </div>
      </div>
    </div>
  );
}

export default Backlog;
