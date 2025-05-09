'use client';

import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const Sidebar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-screen bg-black text-white w-64 p-4 justify-between items-start">
      <div className="w-full">
        <div className="flex items-center justify-between gap-3 px-2 py-2 mb-6 bg-[#2B2B2B] rounded cursor-pointer group relative">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-medium">AS</span>
            </div>
            <div
              className="flex items-center justify-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Asad Sohail</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    v.asadsohail@outlook.com
                    <span className="flex flex-col">
                      <IoIosArrowUp className={`text-gray-400 transition-opacity duration-200 ${isDropdownOpen ? 'opacity-100' : 'opacity-50'}`} />
                      <IoIosArrowDown className={`text-gray-400 transition-opacity duration-200 ${!isDropdownOpen ? 'opacity-100' : 'opacity-50'}`} />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 w-full bg-[#2B2B2B] rounded shadow-lg z-10">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-[#3B3B3B] cursor-pointer">Manage account</li>
                <li className="px-4 py-2 hover:bg-[#3B3B3B] cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-[#3B3B3B] cursor-pointer">Sync</li>
              </ul>
            </div>
          )}
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 rounded bg-[#2B2B2B] text-white focus:outline-none"
          />
        </div>
        <ul className="space-y-2">
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
            My Day
          </li>
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
            Important
          </li>
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
            Planned
            <span className="ml-auto text-xs bg-[#2B2B2B] px-2 py-0.5 rounded">1</span>
          </li>
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
            Assigned to me
          </li>
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
            Flagged email
          </li>
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer bg-[#2B2B2B]">
            Tasks
            <span className="ml-auto text-xs bg-[#2B2B2B] px-2 py-0.5 rounded">1</span>
          </li>
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
            Current Sprint
            <span className="ml-auto text-xs bg-[#2B2B2B] px-2 py-0.5 rounded">1</span>
          </li>
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
            Backlog
          </li>
          <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
            Done
          </li>
        </ul>
      </div>
      <div className="w-full">
        <button className="flex items-center justify-center gap-2 w-full px-3 py-2 mb-12 bg-[#2B2B2B] rounded">
          + New list
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
