import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

type Task = {
  description: string;
  status: boolean;
  date: string;
  id: string;
};

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskStatusChange: (index: number) => void;
  onTaskDelete: (id: string) => void;
}

const TaskLists = ({
  tasks,
  onTaskClick,
  onTaskStatusChange,
  onTaskDelete,
}: TaskListProps) => {
  return (
    <div className="flex flex-col gap-2 mt-10">
      {tasks.map((item, index) => (
        <div
          key={index}
          className="w-full flex justify-between items-center rounded px-6 py-2 bg-white cursor-pointer"
          onClick={() => onTaskClick(item)}
        >
          <div className="flex gap-3 items-start">
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTaskDelete(item.id);
            }}
          >
            <RiDeleteBin6Line className="w-[20px] h-[20px]" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskLists;
