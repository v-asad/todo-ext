import { IoMdStarOutline } from "react-icons/io";
import { TbBrightnessUpFilled } from "react-icons/tb";
import { MdAddBusiness, MdInsertChartOutlined } from "react-icons/md";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiFlag1, CiHome, CiUser } from "react-icons/ci";

const SideBarItems = [
  {
    icon: <TbBrightnessUpFilled color="grey" />,
    text: "My Day",
  },
  {
    icon: <IoMdStarOutline color="maroon" />,
    text: "Important",
  },
  {
    icon: <MdInsertChartOutlined color="green" />,
    text: "Planned",
  },
  {
    icon: <CiUser color="green" />,
    text: "Assigned to me",
  },
  {
    icon: <CiFlag1 color="red" />,
    text: "Flagged email",
  },
  {
    icon: <CiHome color="lightblue" />,
    text: "Tasks",
  },

  {
    icon: <IoReorderThreeOutline />,
    text: "Current Sprint",
  },
  {
    icon: <IoReorderThreeOutline />,
    text: "BackLog",
  },
  {
    icon: <IoReorderThreeOutline />,
    text: "Done",
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-[black]/80 text-white w-full max-w-[280px] px-4   justify-center items-start  gap-[80px]">
      <div className="w-full flex flex-col gap-2 justify-center items-start">
        <input
          type="search"
          placeholder="Search"
          className="w-full px-3 py-2 rounded bg-[#2B2B2B] text-white focus:outline-none"
        />

        {SideBarItems.map((item, i) => (
          <ul key={i} className="space-y-2 w-full">
            <li className="flex items-center justify-start gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">
              {item.icon}
              {item.text}
            </li>
          </ul>
        ))}
      </div>

      <button className="flex items-center justify-between gap-2 w-full px-3 py-2 mb-12 bg-[#2B2B2B] rounded">
        <div className="flex justify-center items-center gap-[15px]">
          <p> +</p>
          <p> New list</p>
        </div>

        <div className="">
          <MdAddBusiness />
        </div>
      </button>
    </div>
  );
};

export default Sidebar;
