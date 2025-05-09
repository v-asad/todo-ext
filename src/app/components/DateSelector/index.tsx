"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

type DateSelectorProps = {
  onDateSelect: (date: string) => void;
  onClose: () => void;
};

export default function DateSelector({
  onDateSelect,
  onClose,
}: DateSelectorProps) {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleOptionSelect = (option: string) => {
    const today = new Date();
    const format = (d: Date) => d.toISOString().split("T")[0];

    if (option === "today") {
      onDateSelect(format(today));
      onClose?.();
    } else if (option === "tomorrow") {
      today.setDate(today.getDate() + 1);
      onDateSelect(format(today));
      onClose?.();
    } else if (option === "nextWeek") {
      today.setDate(today.getDate() + 7);
      onDateSelect(format(today));
      onClose?.();
    } else if (option === "custom") {
      setIsCalendarModalOpen(true);
    }
  };
  const handleCustomDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date.toISOString().split("T")[0]);
      setIsCalendarModalOpen(false);
      onClose?.();
    }
  };

  return (
    <div>
      <select
        className="text-sm border rounded px-3 py-1 bg-white"
        defaultValue=""
        onChange={(e) => handleOptionSelect(e.target.value)}
      >
        <option value="">Select Date</option>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="nextWeek">Next Week</option>
        <option value="custom">Pick a date</option>
      </select>

      {isCalendarModalOpen && (
        <div className="fixed inset-0 flex justify-end items-center bg-transparent bg-opacity-30 z-50 px-10">
          <div className="bg-white p-6 rounded shadow-md z-50">
            <h2 className="text-lg font-semibold mb-4">Select a date</h2>
            <DatePicker
              selected={selectedDate}
              onChange={handleCustomDateSelect}
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
    </div>
  );
}
