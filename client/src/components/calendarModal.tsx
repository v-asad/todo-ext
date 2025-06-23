'use client';
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

type CalendarModalProps = {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
};

const CalendarModal = ({ selectedDate, onSelectDate, onClose }: CalendarModalProps) => {
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(selectedDate);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setTempSelectedDate(date);
    }
  };
  const handleSaveDate = () => {
    if (tempSelectedDate) {
      onSelectDate(tempSelectedDate);
      onClose();
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex justify-end items-center bg-opacity-40 z-50 px-[50px]">
      <div ref={modalRef} className="flex flex-col  p-6 rounded shadow-md z-50 bg-[white]">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="custom-header flex justify-between items-center px-[15px] text-black">
              <div className="month-year bg-[white]">
                {date.toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="flex gap-2 justify-center items-center">
                <button onClick={decreaseMonth} disabled={nextMonthButtonDisabled}>
                  <MdArrowDropUp size={25} />
                </button>
                <button onClick={increaseMonth} disabled={prevMonthButtonDisabled}>
                  <MdArrowDropDown size={25} />
                </button>
              </div>
            </div>
          )}
        />
        <div className="w-full gap-1 flex justify-between items-baseline-last">
          <button
            onClick={onClose}
            className="mt-4 text-[red] text-[14px] bg-[#535353] w-full py-[6px] rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveDate}
            className="bg-[#8bd3ce] text-black  py-[6px] rounded text-[14px] w-full cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
