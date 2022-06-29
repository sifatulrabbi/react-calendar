/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import React from "react";

export function useCalendar() {
    const [monthAndYear, setMonthAndYear] = React.useState<
        [month: number, year: number]
    >([new Date().getMonth(), new Date().getFullYear()]);
    const [calendarDates, setCalendarDates] = React.useState<string[][]>([]);

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

        // In case the first day of the month is not Sunday push a 0 on the start of the array
        if (startDay > 0) {
            let prevDayIndex = 0;
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

        setCalendarDates(calendarDates);
    }

    /**
     * Set the calendar to next month's calendar
     */
    function nextMonth() {
        setMonthAndYear((prev) => [prev[0] + 1, prev[1]]);
    }

    /**
     * Set the calendar to previous month's calendar
     */
    function prevMonth() {
        setMonthAndYear((prev) => [prev[0] - 1, prev[1]]);
    }

    React.useEffect(() => {
        generateCalendarDates();
    }, [monthAndYear]);

    return {
        monthAndYear,
        calendarDates,
        updateMonthAndYear,
        generateCalendarDates,
        nextMonth,
        prevMonth,
    };
}
