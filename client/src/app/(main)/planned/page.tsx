import React from 'react';
import { MdInsertChartOutlined } from 'react-icons/md';

function Planned() {
  return (
    <div className="w-full flex flex-col justify-between items-start p-10 bg-[#171717] h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 justify-start items-center">
          <button>
            <MdInsertChartOutlined className="w-7.5 h-7.5" color="green" />
          </button>
          <h1 className="text-2xl text-[green]">Planned</h1>
        </div>
      </div>
    </div>
  );
}

export default Planned;
