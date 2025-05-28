"use client";

import { v4 as uuidv4 } from "uuid";
import { IoAdd } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { FaRegCircle } from "react-icons/fa";
import { useState, ChangeEvent, useEffect, useRef } from "react";

import DateSelector from "@/components/DateSelector";
import Drawer from "@/components/modals/drawer";
import TaskLists from "@/components/TaskLists";
import { CiHome } from "react-icons/ci";
import { BsCalendar3 } from "react-icons/bs";
import CalendarModal from "@/components/calendarModal";

export type Task = {
  id: string;
  description: string;
  status: boolean;
  date: string;
};

export default function Home() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDate, setTaskDate] = useState("");
  const [focused, setFocused] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const handleAddTask = () => {
    if (taskTitle.trim() === "") {
      toast.error("Please add the text.");
      return;
    }

    const newTask: Task = {
      description: taskTitle,
      status: false,
      date: taskDate,
      id: uuidv4(),
    };
    setTasks((prev) => [newTask, ...prev]);
    setTaskTitle("");
    setTaskDate("");
    setFocused(false);
  };

  const tasksUpdated = (id: string) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updated);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  };
  const handleDateSelect = (date: string) => {
    setTaskDate(date);
    if (date) {
      setSelectedDate(new Date(date));
    } else {
      setSelectedDate(null);
    }
    setShowDateMenu(false);
    inputRef.current?.focus();
  };
  const handleClose = () => {
    setShowDateMenu(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
      setFocused(true);
    }
  };
  const handleCustomDateSelect = (date: Date | null) => {
    if (date) {
      if (date) {
        setSelectedDate(date);
        handleDateSelect(date.toLocaleDateString("en-CA"));
      }
      setShowCalendarModal(false);
    }
  };
  const getDateLabel = (dateStr: string): string => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const target = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffInDays = Math.round(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Tomorrow";

    return target.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const sorted = [...tasks].sort((a, b) => {
      if (a.status && !b.status) return 1;
      if (!a.status && b.status) return -1;
      return 0;
    });
    setSortedTasks(sorted);
  }, [tasks]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowDateMenu(false);
      }
    }

    if (showDateMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDateMenu]);

  return (
    <div className="w-full flex flex-col justify-between p-10 bg-[black]/91 h-screen overflow-hidden relative ">
      <div>
        <div className="flex gap-2 items-center">
          <button onClick={handleAddTask}>
            <CiHome className="w-[30px] h-[30px]" color="#8795a0" />
          </button>
          <h1 className="text-2xl text-[#8795a0]">Tasks</h1>
        </div>
        {tasks.length === 0 && (
          <div className="w-full flex flex-col gap-[20px] justify-center items-center mt-[100px]">
            <FaCircleCheck size={50} color="#7686bf" />
            <p className="text-[#8795a0] w-full max-w-[300px] text-center">
              Tasks show up here if they aren&apos;t part of any lists you&apos;ve created
            </p>
          </div>
        )}
        <div className="max-h-[70vh] overflow-y-auto mt-4 pr-2">
          <TaskLists
            tasks={sortedTasks}
            onTaskClick={handleTaskClick}
            onTaskStatusChange={tasksUpdated}
            onTaskDelete={deleteTask}
          />
        </div>

        <div className="w-full h-full flex justify-center items-end">
          <Toaster position="top-center" />
        </div>

        <Drawer
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedTask={selectedTask}
        />
      </div>
      {showDateMenu && (
        <div ref={calendarRef} className="absolute bottom-22 right-10">
          <DateSelector
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onClose={handleClose}
            openCalendarModal={() => {
              setShowCalendarModal(true);
              setShowDateMenu(false);
            }}
          />
        </div>
      )}
      {showCalendarModal && (
        <CalendarModal
          selectedDate={selectedDate}
          onSelectDate={handleCustomDateSelect}
          onClose={() => setShowCalendarModal(false)}
        />
      )}

      <div className="w-full flex justify-between items-center bg-[grey]/40 hover:bg-[grey]/30 py-1 px-3 rounded h-[46px] ">
        <div className="w-full flex gap-3 justify-start items-center">
          <button onClick={handleAddTask}>
            {focused ? (
              <FaRegCircle className="h-[25px] w-[25px] " color="#8795a0" />
            ) : (
              <IoAdd className="h-[25px] w-[25px] " color="#8795a0" />
            )}
          </button>
          <input
            ref={inputRef}
            value={taskTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => !setFocused}
            placeholder={`${
              focused
                ? "Try typing 'Pay utilities bill by Friday 6pm' "
                : "Add a task"
            }`}
            className="w-full rounded text-white outline-none placeholder:text-[#8795a0] placeholder:text-[14px] hover:text-white"
          />
        </div>

        {focused && taskTitle.trim().length > 0 && (
          <div className="w-full flex justify-end items-center max-w-[130px]">
            <button
              onMouseDown={() => setShowDateMenu(!showDateMenu)}
              className="py-3 px-[6px] hover:bg-[#535353] rounded transition duration-200 focus:outline-none"
            >
              <BsCalendar3 color="white" className="w-[20px] h-[20px]" />
            </button>
            {taskDate && (
              <span className="w-full text-sm text-white ml-2">
                {getDateLabel(taskDate)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
