import React from "react";
import { Task } from "@/app/page";
import { RiDeleteBin6Line } from "react-icons/ri";

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskStatusChange: (index: number) => void;
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
          className="w-full flex justify-between items-center rounded px-6 py-2 bg-white cursor-pointer"
          onClick={() => onTaskClick(item)}
        >
          <div className="flex gap-3 items-start justify-center">
            <div>
              <input
                type="checkbox"
                checked={item.status}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onTaskStatusChange(index)}
              />
            </div>
            <div>
              <p className={item.status ? "line-through text-gray-500" : ""}>
                {item.description}
              </p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>
          </div>
          <button onClick={handleTaskDelete(item.id, onTaskDelete)}>
            <RiDeleteBin6Line className="w-[20px] h-[20px]" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskLists;
