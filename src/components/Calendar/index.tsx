/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {v4} from "uuid";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import {useCalendar} from "../../hooks";

import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import DateBtn from "./Date";

dayjs.extend(isBetween);

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar: React.FC = () => {
  const {
    monthAndYear,
    calendarDates,
    startDate,
    endDate,
    updateMonthAndYear,
    nextMonth,
    prevMonth,
    handleSelect,
    clearSelection,
    setToday,
  } = useCalendar();

  React.useEffect(() => {
    updateMonthAndYear();
  }, []);

  return (
    <div className="max-w-md border-[1px] rounded">
      {/* Top part */}
      <div className="w-full p-2 flex flex-row justify-between items-center border-b-[1px]">
        <button
          onClick={prevMonth}
          className="hover:bg-gray-100 p-2 rounded-full"
        >
          <MdChevronLeft />
        </button>
        <div className="w-full grid grid-cols-[1fr_auto] items-center px-2">
          <span className="block font-bold">
            {monthNames[monthAndYear[0]]}, {monthAndYear[1]}
          </span>
          <button
            className="text-blue-400 text-xs uppercase tracking-wider rounded p-2 hover:bg-gray-100"
            onClick={setToday}
          >
            Today
          </button>
        </div>
        <button
          onClick={nextMonth}
          className="hover:bg-gray-100 p-2 rounded-full"
        >
          <MdChevronRight />
        </button>
      </div>

      {/* Body */}
      <div className="max-w-full h-auto grid grid-cols-7">
        {calendarDates.map((date, index) => (
          <div key={v4()} className="w-full flex flex-col justify-start">
            <span className="uppercase text-center w-full block text-xs p-2 border-r-[1px]">
              {dayNames[index]}
            </span>
            {date.map((dateStr) => (
              <DateBtn
                key={v4()}
                dateStr={dateStr}
                monthAndYear={monthAndYear}
                onSelect={handleSelect}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="flex flex-row items-center w-full px-4 border-t-[1px]">
        <div className="w-full text-xs grid grid-cols-2">
          <span>
            <span className="font-bold inline-block mr-1">From:</span>
            {startDate ? dayjs(startDate).format("ddd, DD/MM/YY") : "--"}
          </span>
          <span>
            <span className="font-bold inline-block mr-1">To:</span>
            {endDate ? dayjs(endDate).format("ddd, DD/MM/YY") : "--"}
          </span>
        </div>
        <button
          className="text-blue-400 text-xs uppercase tracking-wider p-2"
          onClick={clearSelection}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calendar;
