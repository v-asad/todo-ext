const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-black text-white w-64 p-4 justify-between">
      <div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 rounded bg-[#2B2B2B] text-white focus:outline-none" />
        </div>
        <ul className="space-y-2">
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer"> My Day</li>
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">Important</li>
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer"> Planned <span className="ml-auto text-xs bg-[#2B2B2B] px-2
           py-0.5 rounded">1</span></li>
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer"> Assigned to me</li>
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer"> Flagged email</li>
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer bg-[#2B2B2B]"> Tasks <span className="ml-auto text-xs bg-[#2B2B2B]
           px-2 py-0.5 rounded">1</span></li>
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer"> Current Sprint <span className="ml-auto text-xs bg-[#2B2B2B]
           px-2 py-0.5 rounded">1</span></li>
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer"> Backlog</li>
          <li className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#2B2B2B] cursor-pointer">Done</li>
        </ul>
      </div>
      <div>
        <button className="flex items-center gap-2 w-full px-3 py-2 mb-12 bg-[#2B2B2B] rounded">
          + New list
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
