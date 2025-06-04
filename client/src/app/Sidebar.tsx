'use client';

import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import {
  FaSun,
  FaStar,
  FaCalendarAlt,
  FaUser,
  FaFlag,
  FaTasks,
  FaRunning,
  FaListAlt,
  FaCheck,
  FaPlus,
} from 'react-icons/fa';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { maskEmail } from '@/utils/email';
import { FaUserCog } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';

interface SidebarProps {
  userEmail: string;
  userName: string;
}

const Sidebar = ({ userEmail, userName }: SidebarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<string>('Tasks');
  const displayEmail = maskEmail(userEmail);

  const navigationItems = [
    { id: 'my-day', label: 'My Day', icon: <FaSun /> },
    { id: 'important', label: 'Important', icon: <FaStar /> },
    { id: 'planned', label: 'Planned', count: 1, icon: <FaCalendarAlt /> },
    { id: 'assigned', label: 'Assigned to me', icon: <FaUser /> },
    { id: 'flagged', label: 'Flagged email', icon: <FaFlag /> },
    { id: 'tasks', label: 'Tasks', count: 1, icon: <FaTasks /> },
    { id: 'sprint', label: 'Current Sprint', count: 1, icon: <FaRunning /> },
    { id: 'backlog', label: 'Backlog', icon: <FaListAlt /> },
    { id: 'done', label: 'Done', icon: <FaCheck /> },
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const performSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleNewList = () => {
    console.log('Creating new list');
  };

  const handleNavigationClick = (itemId: string) => {
    setActiveItem(itemId);
    console.log('Navigating to:', itemId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white w-64 p-4 justify-between items-start">
      <div className="w-full">
        <div className="flex items-center justify-between gap-3 px-2 py-2 mb-6 bg-[#2B2B2B] rounded cursor-pointer group relative">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-medium">MS</span>
            </div>
            <div
              className="flex items-center justify-center gap-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    {displayEmail}
                    <span className="flex flex-col -space-y-1">
                      <IoIosArrowUp
                        className={`text-gray-400 transition-opacity duration-200 ${isDropdownOpen ? 'opacity-100' : 'opacity-50'}`}
                      />
                      <IoIosArrowDown
                        className={`text-gray-400 transition-opacity duration-200 ${!isDropdownOpen ? 'opacity-100' : 'opacity-50'}`}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isDropdownOpen && (
            <div
              className="absolute top-full left-0 w-full bg-[#2B2B2B] rounded-xl shadow-xl z-10 mt-2"
              role="menu"
              aria-labelledby="user-menu-button"
            >
              <ul className="py-2 divide-y divide-[#393939]" role="none">
                <li
                  className="px-4 py-3 hover:bg-[#3B3B3B] cursor-pointer transition-colors flex items-center gap-3"
                  role="menuitem"
                >
                  <FaUserCog className="text-white text-lg" />
                  <span className="text-white">Manage accounts</span>
                </li>
                <li
                  className="px-4 py-3 hover:bg-[#3B3B3B] cursor-pointer transition-colors flex items-center gap-3"
                  role="menuitem"
                >
                  <IoSettingsSharp className="text-white text-lg" />
                  <span className="text-white">Settings</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && performSearch()}
            className="w-full px-3 py-2 rounded bg-[#2B2B2B] text-white focus:outline-none"
          />
        </div>
        <nav aria-label="Main Navigation" className="mb-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer ${
                  activeItem === item.id ? 'bg-[#2B2B2B]' : ''
                }`}
                onClick={() => handleNavigationClick(item.id)}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
                {item.count && (
                  <span className="ml-auto text-xs bg-[#2B2B2B] px-2 py-0.5 rounded">
                    {item.count}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="w-full flex items-center justify-between bg-[#2B2B2B] mb-12 px-3 py-2 text-lg rounded">
        <button
          type="button"
          onClick={() => handleNewList()}
          className="flex items-center justify-start gap-2 w-full  bg-[#2B2B2B] rounded"
        >
          <FaPlus />
          New list
        </button>
        <div>
          <MdFormatListBulletedAdd />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
