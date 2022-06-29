/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import React from "react";

export function useCalendar() {
    const [monthAndYear, setMonthAndYear] = React.useState<
        [month: number, year: number]
    >([new Date().getMonth(), new Date().getFullYear()]);
    const [calendarDates, setCalendarDates] = React.useState<string[][]>([]);
    // UI states
    const [startDate, setStartDate] = React.useState<string>("");
    const [endDate, setEndDate] = React.useState<string>("");
    const [isStart, setIsStart] = React.useState<boolean>(true);

    /**
     * Update the current month and year
     */
    function updateMonthAndYear(month?: number, year?: number) {
        const today = new Date();
        setMonthAndYear([
            month ? month : today.getMonth(),
            year ? year : today.getFullYear(),
        ]);
    }

    /**
     * Generate this month's dates
     */
    function generateCalendarDates() {
        const dateObj = new Date(monthAndYear[1], monthAndYear[0]);
        const daysInMonth = dayjs(dateObj).daysInMonth();
        /** Calendar dates sorted by week days */
        const calendarDates: string[][] = [[], [], [], [], [], [], []];

        let startDay = 0;
        let endDay = 0;

        for (let i = 1; i < daysInMonth + 1; i++) {
            const date = dayjs(
                new Date(dateObj.getFullYear(), dateObj.getMonth(), i),
            );
            calendarDates[date.day()].push(date.format());
            calendarDates[date.day()].sort();

            // Find the first day of the month
            if (date.date() === 1) {
                startDay = date.day();
            }
            // Find the last day of the month
            if (date.date() === daysInMonth) {
                endDay = date.day();
            }
        }

        // In case the first day of the month is not Sunday (the first day)
        //  add the dates from the previous month on the start of the dates array
        if (startDay > 0 /* first day's index */) {
            let prevDayIndex = 0; // previous day index
            for (let i = startDay - 1; i > -1; i--) {
                const d = dayjs(
                    new Date(
                        monthAndYear[1],
                        monthAndYear[0],
                        0 - prevDayIndex,
                    ),
                ).format();
                prevDayIndex++;

                calendarDates[i].unshift(d);
            }
        }

        // Incase the end date is not the last day of the month.
        // Show dates from the next month by adding next month's dates on the end of the dates array
        if (endDay < 6 /* last day's index */) {
            // Next month's first day is the day after the last day of the current month
            let nextDayIndex = daysInMonth + 1;
            for (let i = endDay + 1; i < 7; i++) {
                const d = dayjs(
                    new Date(monthAndYear[1], monthAndYear[0], nextDayIndex),
                ).format();
                nextDayIndex++;

                calendarDates[i].push(d);
            }
        }

        setCalendarDates(calendarDates);
    }

    /**
     * Set the calendar to next month's calendar
     */
    function nextMonth() {
        setMonthAndYear((prev) => {
            const nextMonth = prev[0] + 1;
            if (nextMonth > 11) {
                return [0, prev[1] + 1];
            }
            return [nextMonth, prev[1]];
        });
    }

    /**
     * Set the calendar to previous month's calendar
     */
    function prevMonth() {
        setMonthAndYear((prev) => {
            const prevMonth = prev[0] - 1;
            if (prevMonth < 0) {
                return [11, prev[1] - 1];
            }
            return [prevMonth, prev[1]];
        });
    }

    React.useEffect(() => {
        generateCalendarDates();
    }, [monthAndYear]);

    /**
     * Set the current month and year according to todays date
     */
    function setToday() {
        const d = new Date();
        updateMonthAndYear(d.getMonth(), d.getFullYear());
    }

    /**
     * Handle the date selection
     */
    function handleSelect(dateStr: string) {
        // The last date is flexible and can change without using the clear button
        if (isStart) {
            setStartDate(dateStr);
            setIsStart(false);
        } else {
            if (dayjs(dateStr).isBefore(startDate)) return;
            setEndDate(dateStr);
        }
    }

    /**
     * Clears all the selected dates
     */
    function clearSelection() {
        setStartDate("");
        setEndDate("");
        setIsStart(true);
    }

    return {
        monthAndYear,
        calendarDates,
        startDate,
        endDate,
        updateMonthAndYear,
        generateCalendarDates,
        nextMonth,
        prevMonth,
        setToday,
        handleSelect,
        clearSelection,
    };
}
