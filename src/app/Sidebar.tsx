"use client";

import { useState } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { TbBrightnessUpFilled } from "react-icons/tb";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiFlag1, CiHome, CiUser } from "react-icons/ci";
import { MdAddBusiness, MdInsertChartOutlined } from "react-icons/md";

interface SidebarItem {
  Icon: React.ComponentType<{ color?: string }>;
  Text: string;
}

const sidebarItems: SidebarItem[] = [
  {
    Icon: TbBrightnessUpFilled,
    Text: "My Day",
  },
  {
    Icon: IoMdStarOutline,
    Text: "Important",
  },
  {
    Icon: MdInsertChartOutlined,
    Text: "Planned",
  },
  {
    Icon: CiUser,
    Text: "Assigned to me",
  },
  {
    Icon: CiFlag1,
    Text: "Flagged email",
  },
  {
    Icon: CiHome,
    Text: "Tasks",
  },

  {
    Icon: IoReorderThreeOutline,
    Text: "Current Sprint",
  },
  {
    Icon: IoReorderThreeOutline,
    Text: "BackLog",
  },
  {
    Icon: IoReorderThreeOutline,
    Text: "Done",
  },
];

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("Tasks");
  return (
    <div className="flex flex-col h-screen bg-[black]/80 text-white w-full max-w-[280px] px-4 justify-center items-start  gap-[80px]">
      <div className="w-full flex flex-col gap-2 justify-center items-start">
        <input
          type="search"
          placeholder="Search"
          className="w-full px-3 py-2 rounded bg-[#2B2B2B] text-white focus:outline-none"
        />

        {sidebarItems.map((item, i) => (
          <ul key={i} className="space-y-2 w-full">
            <li
              onClick={() => setActiveItem(item.Text)}
              data-active={activeItem === item.Text ? "true" : "false"}
              className={`flex items-center justify-start gap-3 px-2 py-2 rounded cursor-pointer ${
                activeItem === item.Text ? "bg-[#535353]" : ""
              }`}
            >
              <item.Icon color={activeItem === item.Text ? "yellow" : "grey"} />
              <span>{item.Text}</span>
            </li>
          </ul>
        ))}
      </div>

      <button className="flex items-center justify-between gap-2 w-full px-3 py-2 mb-12 bg-[#2B2B2B] rounded">
        <div className="flex justify-center items-center gap-[15px]">
          <p> +</p>
          <p> New list</p>
        </div>

        <MdAddBusiness />
      </button>
    </div>
  );
};

export default Sidebar;
