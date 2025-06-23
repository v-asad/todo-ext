'use client';

import { Task } from '@/app/(main)/page';
import React from 'react';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedTask: Task | undefined;
};

const Drawer = ({ isOpen, onClose, selectedTask }: DrawerProps) => {
  return (
    <div>
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-[#535353] p-6 transition-transform z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={onClose} className="mb-4 text-red-500 cursor-pointer">
          Close
        </button>
        {selectedTask && (
          <>
            <p className="mt-4 font-bold text-white text-[24px]">{selectedTask.description}</p>
            <p className="text-sm text-white mt-2">
              Status: {selectedTask.status ? 'Completed' : 'Uncompleted'}
            </p>
            <p className="text-sm text-white mt-2">Date: {selectedTask.date}</p>
          </>
        )}
      </div>

      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-opacity-40 z-40" />}
    </div>
  );
};

export default Drawer;
