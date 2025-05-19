"use client";

import { useState } from "react";
import CalendarModal from "../calendarModal";
import { BsCalendar3 } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    const formatLocalDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    if (option === "today") {
      onDateSelect(formatLocalDate(today));
      onClose();
    } else if (option === "tomorrow") {
      today.setDate(today.getDate() + 1);
      onDateSelect(formatLocalDate(today));
      onClose();
    } else if (option === "nextWeek") {
      today.setDate(today.getDate() + 7);
      onDateSelect(formatLocalDate(today));
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
    <div className="z-5  py-[15px] border border-[gray] rounded shadow-md  space-y-2s bg-[#2a2a2a] text-white w-[250px] h-[250px]">
      <button
        className="w-full  text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] hover:cursor-pointer"
        onClick={() => handleOptionSelect("today")}
      >
        {" "}
        <BsCalendar3 />
        Today
      </button>
      <button
        className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] hover:cursor-pointer"
        onClick={() => handleOptionSelect("tomorrow")}
      >
        <BsCalendar3 />
        Tomorrow
      </button>
      <button
        className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] hover:cursor-pointer"
        onClick={() => handleOptionSelect("nextWeek")}
      >
        <BsCalendar3 />
        Next Week
      </button>
      <button
        className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] hover:cursor-pointer"
        onClick={() => {
          handleOptionSelect("custom");
        }}
      >
        <BsCalendar3 />
        Pick a date
      </button>
      {isCalendarModalOpen && (
        <CalendarModal
          selectedDate={selectedDate}
          onSelectDate={handleCustomDateSelect}
          onClose={() => setIsCalendarModalOpen(false)}
        />
      )}
      <button className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] text-[red] hover:cusror-pointer ">
        <RiDeleteBin6Line color="red" className="w-[20px] h-[20px]" />
        Remove due date
      </button>
    </div>
  );
}
