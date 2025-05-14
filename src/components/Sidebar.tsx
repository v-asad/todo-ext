"use client";

import { useState } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { TbBrightnessUpFilled } from "react-icons/tb";
import { IoAddSharp, IoReorderThreeOutline } from "react-icons/io5";
import { CiFlag1, CiHome, CiUser } from "react-icons/ci";
import { MdAddBusiness, MdInsertChartOutlined } from "react-icons/md";

interface SidebarItem {
  id: string;
  Icon: React.ComponentType<{ color?: string }>;
  text: string;
  color: string;
}

const sidebarItems: SidebarItem[] = [
  { id: "my-day", Icon: TbBrightnessUpFilled, text: "My Day", color: "grey" },
  {
    id: "important",
    Icon: IoMdStarOutline,
    text: "Important",
    color: "pink",
  },
  {
    id: "planned",
    Icon: MdInsertChartOutlined,
    text: "Planned",
    color: "green",
  },
  {
    id: "assigned",
    Icon: CiUser,
    text: "Assigned to me",
    color: "green",
  },
  {
    id: "flagged",
    Icon: CiFlag1,
    text: "Flagged email",
    color: "red",
  },
  {
    id: "tasks",
    Icon: CiHome,
    text: "Tasks",
    color: "#606da3",
  },

  {
    id: "sprint",
    Icon: IoReorderThreeOutline,
    text: "Current Sprint",
    color: "#c2c1c1",
  },
  {
    id: "backlog",
    Icon: IoReorderThreeOutline,
    text: "BackLog",
    color: "#c2c1c1",
  },
  {
    id: "done",
    Icon: IoReorderThreeOutline,
    text: "Done",
    color: "#c2c1c1",
  },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("Tasks");
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
              onClick={() => setActiveItem(item.id)}
              data-active={activeItem === item.id ? "true" : "false"}
              className={`flex items-center justify-start gap-3 px-2 py-2 rounded cursor-pointer ${
                activeItem === item.id ? "bg-[#535353]" : ""
              }`}
            >
              <item.Icon color={item.color} />
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
