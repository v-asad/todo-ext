import React from 'react';
import { Task } from '@/app/(main)/page';
import { RiCalendarLine, RiDeleteBin6Line } from 'react-icons/ri';
import { HiCheck } from 'react-icons/hi';
import { TbBrightnessUpFilled } from 'react-icons/tb';

type TaskListProps = {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onTaskStatusChange: (id: string) => void;
  onTaskDelete: (id: string) => void;
};

const handleTaskDelete = (id: string, onTaskDelete: (id: string) => void) => {
  return (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onTaskDelete(id);
  };
};

const TaskLists = ({ tasks, onTaskClick, onTaskStatusChange, onTaskDelete }: TaskListProps) => {
  const completedTasks = tasks.filter((task) => task.status);
  const incompleteTasks = tasks.filter((task) => !task.status);

  const getDateLabel = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const target = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffInDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Tomorrow';

    return target.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderTasks = (taskArray: Task[]) =>
    taskArray.map((item, index) => (
      <div
        key={index}
        className={
          'w-full flex justify-between items-center rounded py-3 px-6 bg-[#2a2a2a] cursor-pointer'
        }
        onClick={() => onTaskClick(item)}
      >
        <div
          className={` ${
            item.date
              ? 'flex gap-3 justify-center items-start'
              : 'flex gap-3 justify-center items-center py-2'
          }`}
        >
          <div className="">
            <label className="inline-flex items-center " onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={item.status}
                onChange={() => onTaskStatusChange(item.id)}
                className="sr-only peer"
              />
              <div className="flex justify-center items-center w-5 h-5 rounded-full border-2 border-white peer-checked:bg-[#8bd3ce] peer-checked:border-[#8bd3ce] transition-colors">
                <HiCheck
                  className={`${
                    item.status ? 'text-[#2a2a2a]' : 'hover:text-white text-[#2a2a2a]'
                  }`}
                />
              </div>
            </label>
          </div>
          <div className="flex flex-col gap-0.5 justify-start items-start">
            <p className={item.status ? 'line-through text-white' : 'text-white'}>
              {item.description}
            </p>
            <div className="flex gap-2 justify-center items-center">
              {item.date === new Date().toISOString().split('T')[0] && (
                <div className="flex gap-1 justify-center items-center">
                  <TbBrightnessUpFilled size={15} color="lightgrey" />
                  <p className="text-[12px] text-[lightgrey]">My Day</p>
                </div>
              )}

              {item.date && (
                <div className="flex gap-1 justify-center items-center">
                  <RiCalendarLine color="white" size={12} />
                  <p
                    className={`text-xs ${
                      new Date(item.date) >= new Date(new Date().toDateString())
                        ? 'text-white'
                        : 'text-[red]'
                    } `}
                  >
                    {getDateLabel(item.date)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <button onClick={handleTaskDelete(item.id, onTaskDelete)}>
          <RiDeleteBin6Line color="white" className="w-5 h-5" />
        </button>
      </div>
    ));

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-10 w-full ">
      {incompleteTasks.length > 0 && (
        <div className="w-full flex flex-col gap-2">{renderTasks(incompleteTasks)}</div>
      )}

      {completedTasks.length > 0 && (
        <div className="w-full flex flex-col gap-2 mt-6">
          <h2 className="text-left text-white font-semibold pl-6">Completed</h2>
          {renderTasks(completedTasks)}
        </div>
      )}
    </div>
  );
};

export default TaskLists;
