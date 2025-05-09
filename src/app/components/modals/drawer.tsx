'use client';

import React from 'react';

type Task = {
  description: string;
  status: boolean;
  date: string;
};

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: Task | null;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, selectedTask }) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white p-6 transition-transform z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={onClose} className="mb-4 text-red-500 cursor-pointer">
          Close
        </button>
        {selectedTask && (
          <>
            <p className="mt-4 font-bold">{selectedTask.description}</p>
            <p className="text-sm text-gray-500 mt-2">Status: {selectedTask.status}</p>
            <p className="text-sm text-gray-500 mt-2">Date: {selectedTask.date}</p>
          </>
        )}
      </div>

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-opacity-40 z-40"
        />
      )}
      
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-opacity-40 z-40"
        />
      )}
    </>
  );
};

export default Drawer;
