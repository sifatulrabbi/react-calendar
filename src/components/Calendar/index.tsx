/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {v4} from "uuid";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

import {MdChevronLeft, MdChevronRight} from "react-icons/md";

dayjs.extend(isBetween);

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
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
    const [today, setToday] = React.useState<string>(new Date().toDateString());
    const [daysInMonth, setDaysInMonth] = React.useState<number>(31);
    const [monthName, setMonthName] = React.useState<string>("January");
    const [calendar, setCalendar] = React.useState<string[][]>([]);
    const [increment, setIncrement] = React.useState<number>(0);

    const [startDate, setStartDate] = React.useState<string>("");
    const [endDate, setEndDate] = React.useState<string>("");
    const [isStart, setIsStart] = React.useState<boolean>(true);

    function printDate(dateStr: string) {
        if (isStart) {
            setStartDate(dateStr);
            setIsStart(false);
        } else {
            setEndDate(dateStr);
            setIsStart(true);
        }
    }

    function createCalendar() {
        const arrayOfDates = [];

        for (let i = 0; i < 7; i++) {
            arrayOfDates[i] = [] as string[];
        }

        for (let i = 1; i < daysInMonth; i++) {
            const d = dayjs(today);
            const date = dayjs(new Date(d.year(), d.month(), i));
            arrayOfDates[date.day()].push(date.format());
            arrayOfDates[date.day()].sort();
        }

        setCalendar(arrayOfDates);
    }

    function nextMonth() {
        setIncrement((prev) => prev + 1);
        updateDatesInMonth();
    }

    function previousMonth() {
        setIncrement((prev) => prev - 1);
        updateDatesInMonth();
    }

    function updateDatesInMonth() {
        console.log(increment);
        setDaysInMonth(dayjs(today).daysInMonth() + increment);
    }

    React.useEffect(() => {
        const d = new Date();
        console.log(dayjs(d).daysInMonth());
        setToday(d.toDateString());
        updateDatesInMonth();
        createCalendar();
    }, [today]);

    return (
        <div className="w-max border-[1px] rounded">
            {/* Top part */}
            <div className="w-full p-2 flex flex-row justify-between items-center">
                <button onClick={previousMonth}>
                    <MdChevronLeft />
                </button>
                <span></span>
                <button onClick={nextMonth}>
                    <MdChevronRight />
                </button>
            </div>

            <div className="max-w-md h-auto grid grid-cols-7">
                {calendar.map((date) => (
                    <div
                        key={v4()}
                        className="w-[60px] flex flex-col justify-start"
                    >
                        {date.map((dateStr) => (
                            <button
                                key={v4()}
                                className={`text-sm flex items-end justify-end p-1 h-[60px] border-r-[1px] border-b-[1px] 
                                ${
                                    dayjs(dateStr).isSame(startDate) ||
                                    dayjs(dateStr).isSame(endDate)
                                        ? "bg-blue-100"
                                        : dayjs(dateStr).isBetween(
                                              startDate,
                                              endDate,
                                          )
                                        ? "bg-blue-50"
                                        : "bg-white"
                                }`}
                                onClick={() => printDate(dateStr)}
                            >
                                {dayjs(dateStr).date()}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* Body */}
            <div
                className="grid"
                style={{gridTemplateColumns: "repeat(7, 1fr)"}}
            ></div>
        </div>
    );
};

export default Calendar;
