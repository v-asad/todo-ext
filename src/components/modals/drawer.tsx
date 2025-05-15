"use client";

import { Task } from "@/app/page";
import React from "react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: Task | undefined;
}

const Drawer = ({ isOpen, onClose, selectedTask }: DrawerProps) => {
  return (
    <div>
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white p-6 transition-transform z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={onClose} className="mb-4 text-red-500 cursor-pointer">
          Close
        </button>
        {selectedTask && (
          <>
            <p className="mt-4 font-bold">{selectedTask.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Status: {selectedTask.status}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Date: {selectedTask.date}
            </p>
          </>
        )}
      </div>

      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-opacity-40 z-40" />
      )}
    </div>
  );
};

export default Drawer;
