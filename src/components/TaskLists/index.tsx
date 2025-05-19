import React from "react";
import { Task } from "@/app/page";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskStatusChange: (id: string) => void;
  onTaskDelete: (id: string) => void;
}
const handleTaskDelete = (id: string, onTaskDelete: (id: string) => void) => {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onTaskDelete(id);
  };
};

const TaskLists = ({
  tasks,
  onTaskClick,
  onTaskStatusChange,
  onTaskDelete,
}: TaskListProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 mt-10">
      {tasks.map((item, index) => (
        <div
          key={index}
          className="w-full flex justify-between items-center rounded px-6 py-2 bg-[#2a2a2a] cursor-pointer"
          onClick={() => onTaskClick(item)}
        >
          <div className="flex gap-3 items-start justify-center">
            <div className="h-[40px]">
              <input
                className="rounded-full "
                type="checkbox"
                checked={item.status}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onTaskStatusChange(item.id)}
              />
            </div>
            <div className="flex flex-col gap-[2px] justify-start items-start">
              <p
                className={
                  item.status ? "line-through text-white" : "text-white"
                }
              >
                {item.description}
              </p>
              <p className="text-xs text-[red]">{item.date}</p>
            </div>
          </div>
          <button onClick={handleTaskDelete(item.id, onTaskDelete)}>
            <RiDeleteBin6Line color="white" className="w-[20px] h-[20px]" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskLists;
