"use client";

import { useState } from "react";
import CalendarModal from "../calendarModal";

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
      onClose();
    } else if (option === "tomorrow") {
      today.setDate(today.getDate() + 1);
      onDateSelect(format(today));
      onClose();
    } else if (option === "nextWeek") {
      today.setDate(today.getDate() + 7);
      onDateSelect(format(today));
      onClose();
    } else if (option === "custom") {
      setIsCalendarModalOpen(true);
    }
  };
  const handleCustomDateSelect = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      onDateSelect(date.toISOString().split("T")[0]);
      setIsCalendarModalOpen(false);
      onClose();
    }
  };

  return (
    <div className="z-50 bg-white border rounded shadow-md w-48 p-2 space-y-2s ">
      <button
        className="w-full text-left hover:bg-gray-100 px-2 py-1"
        onClick={() => handleOptionSelect("today")}
      >
        Today
      </button>
      <button
        className="w-full text-left hover:bg-gray-100 px-2 py-1"
        onClick={() => handleOptionSelect("tomorrow")}
      >
        Tomorrow
      </button>
      <button
        className="w-full text-left hover:bg-gray-100 px-2 py-1"
        onClick={() => handleOptionSelect("nextWeek")}
      >
        Next Week
      </button>
      <button
        className="w-full text-left hover:bg-gray-100 px-2 py-1"
        onClick={() => {
          handleOptionSelect("custom");
        }}
      >
        Pick a date
      </button>
      {isCalendarModalOpen && (
        <CalendarModal
          selectedDate={selectedDate}
          onSelectDate={handleCustomDateSelect}
          onClose={() => setIsCalendarModalOpen(false)}
        />
      )}
    </div>
  );
}
