"use client";

import { useState } from "react";
import CalendarModal from "../calendarModal";
import { BsCalendar3 } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiCalendarDotLight } from "react-icons/pi";
import { CgCalendarNext } from "react-icons/cg";
import { LiaCalendarWeekSolid } from "react-icons/lia";

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

  const removeDueDate = () => {
    setSelectedDate(null);
    onDateSelect("");
    onClose();
  };
  return (
    <div className="z-5  py-[15px] border border-[gray] rounded shadow-md  space-y-2s bg-[#2a2a2a] text-white w-[250px] h-[250px]">
      <button
        className="w-full  text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] hover:cursor-pointer"
        onClick={() => handleOptionSelect("today")}
      >
        {" "}
        <PiCalendarDotLight className="w-[20px] h-[20px]" />
        Today
      </button>
      <button
        className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] hover:cursor-pointer"
        onClick={() => handleOptionSelect("tomorrow")}
      >
        <CgCalendarNext className="w-[20px] h-[20px]" />
        Tomorrow
      </button>
      <button
        className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] hover:cursor-pointer"
        onClick={() => handleOptionSelect("nextWeek")}
      >
        <LiaCalendarWeekSolid className="w-[20px] h-[20px]" />
        Next Week
      </button>
      <button
        className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] hover:cursor-pointer"
        onClick={() => {
          handleOptionSelect("custom");
        }}
      >
        <BsCalendar3 className="w-[20px] h-[15px]" />
        Pick a date
      </button>
      {isCalendarModalOpen && (
        <CalendarModal
          selectedDate={selectedDate}
          onSelectDate={handleCustomDateSelect}
          onClose={() => setIsCalendarModalOpen(false)}
        />
      )}
      <button
        onClick={removeDueDate}
        className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[10px] text-[red] hover:cusror-pointer "
      >
        <RiDeleteBin6Line
          color="red"
          className="w-[20px] h-[20px] cursor-pointer"
        />
        Remove due date
      </button>
    </div>
  );
}
