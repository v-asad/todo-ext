import React from "react";
import DatePicker from "react-datepicker";

interface CalendarModalProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

const CalendarModal = ({
  selectedDate,
  onSelectDate,
  onClose,
}: CalendarModalProps) => {
  const HandleDateChange = (date: Date | null) => {
    if (date) {
      onSelectDate(date);
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 flex justify-end items-center bg-black bg-opacity-40 z-50 px-[50px]">
      <div className="bg-white p-6 rounded shadow-md z-50">
        <h2 className="text-lg font-semibold mb-4">Select a date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={HandleDateChange}
          inline
        />
        <button onClick={onClose} className="mt-4 text-red-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CalendarModal;
