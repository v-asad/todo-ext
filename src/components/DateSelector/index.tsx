"use client";

import { BsCalendar3 } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiCalendarDotLight } from "react-icons/pi";

type DateSelectorProps = {
  onDateSelect: (date: string) => void;
  onClose: () => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  openCalendarModal: () => void;
};

export default function DateSelector({
  onDateSelect,
  onClose,
  selectedDate,
  setSelectedDate,
  openCalendarModal,
}: DateSelectorProps) {
  const handleOptionSelect = (option: string) => {
    const formatLocalDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    if (option === "today") {
      const today = new Date();
      setSelectedDate(today);
      onDateSelect(formatLocalDate(today));
      onClose();
    } else if (option === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setSelectedDate(tomorrow);
      onDateSelect(formatLocalDate(tomorrow));
      onClose();
    } else if (option === "nextWeek") {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setSelectedDate(nextWeek);
      onDateSelect(formatLocalDate(nextWeek));
      onClose();
    } else if (option === "custom") {
      openCalendarModal();
      onClose();
    }
  };

  const removeDueDate = () => {
    setSelectedDate(null);
    onDateSelect("");
    onClose();
  };
  const getWeekDay = (offset: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };
  return (
    <div className="z-5 border border-[gray] rounded shadow-md  space-y-2s bg-[#2a2a2a] text-white w-[280px] h-full max-h-[300px]">
      <button
        className="w-full flex justify-between items-center text-left hover:bg-[#535353] px-[20px] py-[15px]"
        onClick={() => handleOptionSelect("today")}
      >
        <div className="flex gap-[10px] justify-start items-center">
          <PiCalendarDotLight className="w-[20px] h-[20px]" />
          <span>Today</span>
        </div>
        <span className="text-[grey]">{getWeekDay(0)}</span>
      </button>
      <button
        className="w-full flex justify-between items-center text-left hover:bg-[#535353] px-[20px] py-[15px]"
        onClick={() => handleOptionSelect("tomorrow")}
      >
        <div className="flex gap-[10px] justify-start items-center">
          <PiCalendarDotLight className="w-[20px] h-[20px]" />
          <span>Tomorrow</span>
        </div>
        <span className="text-[grey]">{getWeekDay(1)}</span>
      </button>
      <button
        className={
          "w-full flex justify-between items-center text-left ${} hover:bg-[#535353] px-[20px] py-[15px] "
        }
        onClick={() => handleOptionSelect("nextWeek")}
      >
        <div className="flex gap-[10px] justify-start items-center">
          <PiCalendarDotLight className="w-[20px] h-[20px]" />
          <span>Next week</span>
        </div>
        <span className="text-[grey]">{getWeekDay(7)}</span>
      </button>
      <button
        className={`w-full text-left flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[15px] border-x-0 border-[grey]  ${
          selectedDate
            ? "border-b-[1px] border-t-[1px]"
            : "border-t-[1px] border-b-0"
        } `}
        onClick={() => {
          handleOptionSelect("custom");
        }}
      >
        <BsCalendar3 className="w-[20px] h-[15px]" />
        Pick a date
      </button>

      {selectedDate && (
        <button
          onClick={removeDueDate}
          className="w-full text-left px- flex gap-[10px] justify-start items-center hover:bg-[#535353] px-[20px] py-[15px] text-[red] hover:cusror-pointer "
        >
          <RiDeleteBin6Line
            color="red"
            className="w-[20px] h-[20px] cursor-pointer"
          />
          Remove due date
        </button>
      )}
    </div>
  );
}
