import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';

function Done() {
  return (
    <div className="w-full flex flex-col justify-between p-10 bg-[#171717] h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 justify-start items-center">
          <button>
            <RxHamburgerMenu className="w-[30px] h-[30px]" color="grey" />
          </button>
          <h1 className="text-2xl text-[grey]">Done</h1>
        </div>
      </div>
    </div>
  );
}

export default Done;
