"use client";

import { useState } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { TbBrightnessUpFilled } from "react-icons/tb";
import { IoAddSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiFlag1, CiHome, CiUser } from "react-icons/ci";
import { MdAddBusiness, MdInsertChartOutlined } from "react-icons/md";
import { useRouter } from "next/navigation";

interface SidebarItem {
  id: string;
  Icon: React.ComponentType<{ color?: string; size?: number }>;
  text: string;
  color: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "my-day",
    Icon: TbBrightnessUpFilled,
    text: "My Day",
    color: "grey",
    path: "/",
  },
  {
    id: "important",
    Icon: IoMdStarOutline,
    text: "Important",
    color: "pink",
    path: "/important",
  },
  {
    id: "planned",
    Icon: MdInsertChartOutlined,
    text: "Planned",
    color: "green",
    path: "/planned",
  },
  {
    id: "assigned",
    Icon: CiUser,
    text: "Assigned to me",
    color: "green",
    path: "/assigned",
  },
  {
    id: "flagged",
    Icon: CiFlag1,
    text: "Flagged email",
    color: "red",
    path: "flaggedemail",
  },
  {
    id: "tasks",
    Icon: CiHome,
    text: "Tasks",
    color: "#606da3",
    path: "/tasks",
  },

  {
    id: "sprint",
    Icon: RxHamburgerMenu,
    text: "Current Sprint",
    color: "#c2c1c1",
    path: "/",
  },
  {
    id: "backlog",
    Icon: RxHamburgerMenu,
    text: "BackLog",
    color: "#c2c1c1",
    path: "/backlog",
  },
  {
    id: "done",
    Icon: RxHamburgerMenu,
    text: "Done",
    color: "#c2c1c1",
    path: "/done",
  },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("Tasks");
  const router = useRouter();

  const handleItemClick = (id: string, path: string) => {
    setActiveItem(id);
    router.push(path);
  };
  return (
    <div className="h-full flex flex-col bg-[black]/80 text-white w-full max-w-[280px] pt-[30px] px-4 justify-between items-start">
      <div className="w-full flex flex-col gap-1 justify-center items-start ">
        <input
          type="search"
          placeholder="Search"
          className="w-full px-3 py-2 rounded bg-[#2B2B2B] text-white focus:outline-non border-b-[0.5px]"
        />

        {sidebarItems.map((item, i) => (
          <ul key={i} className="space-y-2 w-full pt-[10px]">
            <li
              onClick={() => handleItemClick(item.id, item.path)}
              data-active={activeItem === item.id ? "true" : "false"}
              className={`flex items-center justify-start gap-3 px-2 py-2 rounded cursor-pointer ${
                activeItem === item.id ? "bg-[#535353]" : ""
              }`}
            >
              <item.Icon size={20} color={item.color} />
              <span>{item.text}</span>
            </li>
          </ul>
        ))}
      </div>

      <button className="flex items-center justify-between gap-2 w-full px-3 py-2 mb-12 bg-[#2B2B2B] rounded">
        <div className="flex justify-center items-center gap-[15px]">
          <IoAddSharp />

          <p> New list</p>
        </div>

        <MdAddBusiness />
      </button>
    </div>
  );
};

export default Sidebar;
