'use client';

import { useEffect, useState } from 'react';
import { IoIosLogOut, IoMdStarOutline } from 'react-icons/io';
import { TbBrightnessUpFilled } from 'react-icons/tb';
import { IoAddSharp } from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CiFlag1, CiHome, CiUser } from 'react-icons/ci';
import { MdAddBusiness, MdInsertChartOutlined } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { FaUserCog } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { getUserById, User } from '@/services/userService';

type SidebarItem = {
  id: string;
  Icon: React.ComponentType<{ color?: string; size?: number }>;
  text: string;
  color: string;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  {
    id: 'my-day',
    Icon: TbBrightnessUpFilled,
    text: 'My Day',
    color: 'grey',
    path: '/',
  },
  {
    id: 'important',
    Icon: IoMdStarOutline,
    text: 'Important',
    color: 'pink',
    path: '/important',
  },
  {
    id: 'planned',
    Icon: MdInsertChartOutlined,
    text: 'Planned',
    color: 'green',
    path: '/planned',
  },
  {
    id: 'assigned',
    Icon: CiUser,
    text: 'Assigned to me',
    color: 'green',
    path: '/assigned',
  },
  {
    id: 'flagged',
    Icon: CiFlag1,
    text: 'Flagged email',
    color: 'red',
    path: 'flaggedemail',
  },
  {
    id: 'tasks',
    Icon: CiHome,
    text: 'Tasks',
    color: '#606da3',
    path: '/tasks',
  },

  {
    id: 'sprint',
    Icon: RxHamburgerMenu,
    text: 'Current Sprint',
    color: '#c2c1c1',
    path: '/sprint',
  },
  {
    id: 'backlog',
    Icon: RxHamburgerMenu,
    text: 'BackLog',
    color: '#c2c1c1',
    path: '/backlog',
  },
  {
    id: 'done',
    Icon: RxHamburgerMenu,
    text: 'Done',
    color: '#c2c1c1',
    path: '/done',
  },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>('Tasks');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState<User | null>(null);

  const router = useRouter();

  const handleItemClick = (id: string, path: string) => {
    setActiveItem(id);
    router.push(path);
  };

  const fetchUser = async () => {
    const response = await getUserById();
    setUsers(response);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    router.push('/login');
  };

  return (
    <div className="h-screen flex flex-col bg-[#333333] text-white w-full max-w-[280px] pt-7.5 px-4 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-2 py-2 mb-2  rounded cursor-pointer group relative w-full">
        {users ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#535353] flex items-center justify-center">
              <p className="text-sm font-medium">
                {users.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </p>
            </div>
            <div
              className="flex items-center justify-center gap-3"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex items-center justify-between gap-1">
                <div>
                  <p className="text-sm font-medium">{users.name}</p>
                  <p className="text-xs text-gray-400 flex items-center">
                    {users.email}
                    <span className="flex flex-col -space-y-1">
                      <IoIosArrowUp
                        className={` transition-opacity duration-200 ${isDropdownOpen ? 'opacity-100' : 'opacity-50'}`}
                      />
                      <IoIosArrowDown
                        className={` transition-opacity duration-200 ${!isDropdownOpen ? 'opacity-100' : 'opacity-50'}`}
                      />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          'no user exits'
        )}
        {isDropdownOpen && (
          <div
            className="absolute top-full left-0 w-full bg-[#2B2B2B] rounded-xl shadow-xl z-10 "
            role="menu"
            aria-labelledby="user-menu-button"
          >
            <ul className="py-2 divide-y divide-[#393939]" role="none">
              <li
                className="px-4 py-3 hover:bg-[#535353] cursor-pointer transition-colors flex items-center gap-3"
                role="menuitem"
              >
                <FaUserCog className="text-white text-lg" />
                <span className="text-white">Manage account</span>
              </li>
              <li
                className="px-4 py-3 hover:bg-[#535353] cursor-pointer transition-colors flex items-center gap-3"
                role="menuitem"
              >
                <IoSettingsSharp className="text-white text-lg" />
                <span className="text-white">Settings</span>
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-3 hover:bg-[#535353] cursor-pointer transition-colors flex items-center gap-3"
                role="menuitem"
              >
                <IoIosLogOut className="text-white text-lg" />
                <span className="text-white">Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className=" w-full px-2 flex flex-col gap-1 justify-center items-start">
        <input
          className="w-full px-2.5 py-1 rounded bg-[#2B2B2B] text-white outline-none border-b-[1px] border-white focus:border-b-[3px] focus:border-b-blue-400"
          type="search"
          placeholder="Search"
        />
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="w-full flex flex-col gap-1 justify-center items-start">
          {sidebarItems.map((item, i) => (
            <ul key={i} className="space-y-2 w-full pt-2.5">
              <li
                onClick={() => handleItemClick(item.id, item.path)}
                data-active={activeItem === item.id ? 'true' : 'false'}
                className={`flex items-center justify-start gap-3 px-2 py-2 rounded cursor-pointer ${
                  activeItem === item.id ? 'bg-[#535353]' : ''
                }`}
              >
                <item.Icon size={20} color={item.color} />
                <span>{item.text}</span>
              </li>
            </ul>
          ))}
        </div>
      </div>

      <div className="mt-auto pb-4">
        <button className="flex items-center justify-between gap-2 w-full px-3 py-2 bg-[#2B2B2B] rounded">
          <div className="flex justify-center items-center gap-4">
            <IoAddSharp />
            <p> New list</p>
          </div>
          <MdAddBusiness />
        </button>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-hide::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: #535353;
          border-radius: 3px;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background: #666666;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: thin;
          scrollbar-color: #535353 transparent;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
