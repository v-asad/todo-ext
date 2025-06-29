import React from 'react';
import { CiFlag1 } from 'react-icons/ci';

function FlaggedEmail() {
  return (
    <div className="w-full flex flex-col justify-between items-start p-10 bg-[#171717] h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 justify-start items-center">
          <button>
            <CiFlag1 className="w-7.5 h-7.5" color="red" />
          </button>
          <h1 className="text-2xl text-[red]">Flagged email</h1>
        </div>
      </div>
    </div>
  );
}

export default FlaggedEmail;
