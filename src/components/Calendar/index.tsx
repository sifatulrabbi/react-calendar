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
        <div className="w-max border-[1px] rounded">
            {/* Top part */}
            <div className="w-full p-2 flex flex-row justify-between items-center border-b-[1px]">
                <button onClick={prevMonth}>
                    <MdChevronLeft />
                </button>
                <span>
                    {monthNames[monthAndYear[0]]}, {monthAndYear[1]}
                </span>
                <button onClick={nextMonth}>
                    <MdChevronRight />
                </button>
            </div>

            {/* Body */}
            <div className="max-w-md h-auto grid grid-cols-7">
                {calendarDates.map((date, index) => (
                    <div
                        key={v4()}
                        className="w-[60px] flex flex-col justify-start"
                    >
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
            <div className="w-full border-t-[1px]">
                <button
                    className="text-blue-400 text-xs uppercase tracking-wider p-2"
                    onClick={clearSelection}
                >
                    Clear
                </button>
                <button
                    className="text-blue-400 text-xs uppercase tracking-wider p-2"
                    onClick={setToday}
                >
                    Today
                </button>
            </div>
        </div>
    );
};

export default Calendar;
