'use client';

import { useState, ChangeEvent } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';
import { FaHome } from 'react-icons/fa';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CgCalendar } from 'react-icons/cg';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Drawer from './components/modals/drawer';


type Task = {
  description: string;
  status: 'completed' | 'notCompleted';
  date: string;
};

export default function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskDate, setTaskDate] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDateMenu, setShowDateMenu] = useState(false);

  const handleAddTask = () => {
    if (task.trim() === '') {
      toast.error('Please add the text.');
      return;
    }
    if (taskDate === '') {
      toast.error('Please select the date.');
      return;
    }
   
    const newTask: Task = {
      description: task,
      status: 'notCompleted',
      date: taskDate,
    };
    setTasks([newTask, ...tasks]);
    setTask('');
    setTaskDate('');
  };

  const tasksUpdated = (index: number) => {
    const updated = [...tasks];
    updated[index].status =
      updated[index].status === 'completed' ? 'notCompleted' : 'completed';
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    if (tasks[index].status === 'completed') {
      const updated = tasks.filter((_, i) => i !== index);
      setTasks(updated);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  };
  const sortedTasks =tasks
  .sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    return 0;
  })

  return (
    <div className="p-10 bg-[darkblue]/60 h-screen relative overflow-hidden">
      <div className="flex gap-2 items-center">
        <button onClick={handleAddTask}>
        <FaHome className='w-[30px] h-[30px]' color='white' />
        </button>
        <h1 className="text-2xl text-white">Tasks</h1>
      </div>

      
      <div className="flex flex-col gap-2 mt-10">
        {
          sortedTasks.map((item, index) => (
            <div
              key={index}
              className="w-full flex justify-between items-center rounded px-6 py-2 bg-white cursor-pointer"
              onClick={() => handleTaskClick(item)}
            >
              <div className="flex gap-3 items-start">
                <div>
                <input
                  type="checkbox"
                  checked={item.status === 'completed'}
                  onClick={(e) => e.stopPropagation()}
                  onChange={() => tasksUpdated(index)}
                />
                </div>
                <div>
                  <p className={item.status === 'completed' ? 'line-through text-gray-500' : ''}>
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
              <button  onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(index);
                }}>
               <RiDeleteBin6Line className='w-[20px] h-[20px]' />

              </button>
            </div>
          ))}
      </div>

      
      <div className="w-full flex justify-center items-end py-20">
      <Toaster position="top-center" />
        <div className="w-full flex justify-between items-center max-w-[1270px] bg-white p-3 rounded absolute bottom-14">
          <div className='w-full flex gap-3 justify-start items-center'>
            <button onClick={handleAddTask}>
            <IoIosAddCircleOutline className='w-[20px] h-[20px]' />
          </button>
          <input
            value={task}
            onChange={handleChange}
            placeholder="Add a task"
            className="w-full  rounded outline-none"
          />
          </div>

         <div className='w-full flex justify-end items-center'>
          <button  onClick={() => setShowDateMenu(!showDateMenu)}>
          <CgCalendar className='w-[25px] h-[25px]' />
          </button>
          </div>
          {showDateMenu && (
            <select
              className="text-sm white border rounded px-3 py-1 absolute bottom-1 right-0 bg-white"
              onChange={(e) => {
                const option = e.target.value;
                const today = new Date();
                const format = (d: Date) => d.toISOString().split('T')[0];

                if (option === 'today') {
                  setTaskDate(format(today));
                  setShowDateMenu(false);
                } else if (option === 'tomorrow') {
                  today.setDate(today.getDate() + 1);
                  setTaskDate(format(today));
                  setShowDateMenu(false);
                } else if (option === 'nextWeek') {
                  today.setDate(today.getDate() + 7);
                  setTaskDate(format(today));
                  setShowDateMenu(false);
                } else if (option === 'custom') {
                  setIsCalendarModalOpen(true);
                  setShowDateMenu(false);
                }
              }}
            >
             <option value="">Select Date</option> 
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="nextWeek">Next Week</option>
              <option value="custom">Pick a date</option>
            </select>
          )}
        </div>
      </div>

      
      {isCalendarModalOpen && (
        <div className="fixed inset-0 flex justify-end items-center bg-transparent bg-opacity-40 z-50 px-[50px]">
          <div className="bg-white p-6 rounded shadow-md z-50">
            <h2 className="text-lg font-semibold mb-4">Select a date</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => {
                if (date) {
                  setSelectedDate(date);
                  setTaskDate(date.toISOString().split('T')[0]);
                  setIsCalendarModalOpen(false);
                }
              }}
              inline
            />
            <button
              onClick={() => setIsCalendarModalOpen(false)}
              className="mt-4 text-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      
<Drawer
  isOpen={isSidebarOpen}
  onClose={() => setIsSidebarOpen(false)}
  selectedTask={selectedTask}
/>

    </div>
  );
}
