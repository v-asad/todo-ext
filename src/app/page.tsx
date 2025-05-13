"use client";

import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { CgCalendar } from "react-icons/cg";
import TaskLists from "./components/TaskLists";
import Drawer from "./components/modals/drawer";
import toast, { Toaster } from "react-hot-toast";
import { FaHome, FaRegCircle } from "react-icons/fa";
import DateSelector from "./components/DateSelector";
import { useState, ChangeEvent, useEffect } from "react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [sortedTasks, setSortedTasks] = useState<Task[]>([]);

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
  };

  const tasksUpdated = (index: number) => {
    const updated = [...tasks];
    updated[index].status = !updated[index].status;
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
  };
  const handleClose = ()=> {
    setShowDateMenu(false)
  }
  useEffect(() => {
    const sorted = [...tasks].sort((a, b) => {
      if (a.status && !b.status) return 1;
      if (!a.status && b.status) return -1;
      return 0;
    });
    setSortedTasks(sorted);
  }, [tasks]);

  return (
    <div className="w-full p-10 bg-[black]/91 h-screen relative overflow-hidden">
      <div>
        <div className="flex gap-2 items-center">
          <button onClick={handleAddTask}>
            <FaHome className="w-[30px] h-[30px]" color="lightblue" />
          </button>
          <h1 className="text-2xl text-[lightblue]">Tasks</h1>
        </div>
        {tasks.length === 0 && (
          <div className="w-full flex flex-col gap-[20px] justify-center items-center mt-[100px]">
            <Image
              alt="task"
              width={200}
              height={200}
              src={"/assets/taskimg.PNG"}
            />
            <p className="text-[lightblue] w-full max-w-[300px] text-center">
              Task show up here if they aren't part of any lists you've created
            </p>
          </div>
        )}
        <TaskLists
          tasks={sortedTasks}
          onTaskClick={handleTaskClick}
          onTaskStatusChange={tasksUpdated}
          onTaskDelete={deleteTask}
        />

        <div className="w-full flex justify-center items-end py-20">
          <Toaster position="top-center" />
          <div className="w-full flex justify-between items-center max-w-[1000px] bg-[grey]/40 p-3 rounded absolute bottom-14">
            <div className="w-full flex gap-3 justify-start items-center">
              <button onClick={handleAddTask}>
                <FaRegCircle color="lightblue" className="h-[25px] w-[25px] " />
              </button>
              <input
                value={taskTitle}
                onChange={handleChange}
                placeholder="Add a task"
                className="w-full rounded text-[lightblue] outline-none placeholder:text-[lightblue]"
              />
            </div>

            <div className="w-full flex justify-end items-center">
              <button onClick={() => setShowDateMenu(!showDateMenu)}>
                <CgCalendar color="lightblue" className="w-[25px] h-[25px]" />
              </button>
              {taskDate && (
                <span className="text-sm text-white ml-2">
                  {new Date(taskDate).toLocaleDateString()}
                </span>
              )}
            </div>
            {showDateMenu && (
              <div className="absolute right-0 bottom-full mb-2">
                <DateSelector
                  onDateSelect={handleDateSelect}
                  onClose={handleClose}
                ></DateSelector>
              </div>
            )}
          </div>
        </div>

        <Drawer
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedTask={selectedTask}
        />
      </div>
    </div>
  );
}
