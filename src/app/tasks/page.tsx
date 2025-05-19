"use client";

import { v4 as uuidv4 } from "uuid";
import { IoAdd } from "react-icons/io5";
import { CgCalendar } from "react-icons/cg";
import { FaCircleCheck } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { FaHome, FaRegCircle } from "react-icons/fa";
import { useState, ChangeEvent, useEffect, useRef } from "react";

import DateSelector from "@/components/DateSelector";
import Drawer from "@/components/modals/drawer";
import TaskLists from "@/components/TaskLists";

export type Task = {
  id: string;
  description: string;
  status: boolean;
  date: string;
};

export default function Tasks() {
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDate, setTaskDate] = useState("");
  const [focused, setFocused] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setShowDateMenu(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
    <div className="w-full flex flex-col justify-between p-10 bg-[black]/91 h-screen overflow-hidden relative">
      <div>
        <div className="flex gap-2 items-center">
          <button onClick={handleAddTask}>
            <FaHome className="w-[30px] h-[30px]" color="#608cd4" />
          </button>
          <h1 className="text-2xl text-[#608cd4]">Tasks</h1>
        </div>
        {tasks.length === 0 && (
          <div className="w-full flex flex-col gap-[20px] justify-center items-center mt-[100px]">
            <FaCircleCheck size={50} color="#7686bf" />
            <p className="text-[#608cd4] w-full max-w-[300px] text-center">
              Tasks show up here if they aren't part of any lists you've created
            </p>
          </div>
        )}
        <TaskLists
          tasks={sortedTasks}
          onTaskClick={handleTaskClick}
          onTaskStatusChange={tasksUpdated}
          onTaskDelete={deleteTask}
        />

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
          <DateSelector onDateSelect={handleDateSelect} onClose={handleClose} />
        </div>
      )}
      <div className="w-full flex justify-between items-center bg-[#292929] p-3 rounded ">
        <div className="w-full flex gap-3 justify-start items-center">
          <button onClick={handleAddTask}>
            {focused ? (
              <FaRegCircle className="h-[25px] w-[25px] " color="#608cd4" />
            ) : (
              <IoAdd className="h-[25px] w-[25px] " color="#608cd4" />
            )}
          </button>
          <input
            ref={inputRef}
            value={taskTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => !setFocused}
            placeholder="Add a task"
            className="w-full rounded text-[#608cd4] outline-none placeholder:text-[#608cd4]"
          />
        </div>

        {focused && taskTitle.trim().length > 0 && (
          <div className="w-full flex justify-end items-center">
            <button>
              <CgCalendar
                onMouseDown={() => setShowDateMenu(!showDateMenu)}
                color="#608cd4"
                className="w-[25px] h-[25px] focus:outline-none"
              />
            </button>
            {taskDate && (
              <span className="text-sm text-white ml-2">
                {new Date(taskDate).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
