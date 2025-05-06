'use client'

import { useState, ChangeEvent } from "react";
import Image from "next/image";

type Task = {
  description: string;
  status: 'completed' | 'notCompleted';
};

export default function Home() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("Please add the text.");
      return;
    }

    const newTask: Task = { description: task, status: 'notCompleted' };
    setTasks([newTask, ...tasks]);
    setTask('');
  };

  const tasksUpdated = (index: number) => {
    const updated = [...tasks];
    updated[index].status = updated[index].status === 'completed' ? 'notCompleted' : 'completed';
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    const taskToDelete = tasks[index];
    if (taskToDelete.status === 'completed') {
      const updated = tasks.filter((_, i) => i !== index);
      setTasks(updated);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  return (
    <div className="p-10 bg-[darkblue]/60 h-screen  ">
      <div className="flex gap-[10px] justify-start items-center">
        <Image onClick={()=>handleAddTask} width={30} height={30} alt="home" src={"/assets/home-1-svgrepo-com.svg"}/>
        <h1 className="text-[30px] text-white ">Tasks</h1>
      </div>
      <div className="flex flex-col gap-[5px] justify-center items-start mt-[40px]">
      {tasks
          .sort((a, b) => {
            if (a.status === "completed" && b.status !== "completed") return 1;
            if (a.status !== "completed" && b.status === "completed") return -1;
            return 0;
          })
          .map((item, index) => (
     
      <div key={index}  className="w-full flex justify-between items-center rounded  px-[30px] py-[8px] bg-white">
      <div className=" flex gap-[10px] justify-center items-start bg-[white]  ">
        <div>
        <input
                type="checkbox"
                checked={item.status === 'completed'}
                onChange={() => tasksUpdated(index)}
              />
              
              </div>
              <div>
              <p className={item.status === 'completed' ? 'line-through text-gray-500' : ''}>
                {item.description}
              </p>
                <p>date</p>
              </div>
      </div>
      <div>
      <Image
                src="/assets/bin.png"
                width={20}
                height={20}
                alt="Delete"
                onClick={()=>deleteTask(index)}
                className="cursor-pointer"
              />
      </div>
      </div>
      
    ))}
     
      
      </div>
      <div className="w-full h-full flex justify-center items-end py-[80px]">
      <div className="w-full static ">
      
        <div className="w-full max-w-[1270px] flex gap-[10px] py-[10px] absolute bottom-14 bg-white  rounded px-[10px] overflow-x-hidden">
        <Image className="" onClick={handleAddTask} alt="adbtn" width={20} height={20} src={"/assets/addbtn.svg"}/>
          <input
            value={task}
            onChange={handleChange}
            placeholder="Add a task"
            className="w-full max-w-[600px]  rounded outline-none"
          />
          
          
          
        </div>
        </div>

       
      </div>
    </div>
  );
}
