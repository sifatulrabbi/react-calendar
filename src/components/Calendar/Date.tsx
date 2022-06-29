/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import dayjs from "dayjs";

interface Props {
  monthAndYear: [month: number, year: number];
  dateStr: string;
  onSelect?: (dateStr: string) => void;
  startDate?: string;
  endDate?: string;
}

const DateBtn: React.FC<Props> = ({
  dateStr,
  monthAndYear,
  onSelect,
  startDate,
  endDate,
}) => {
  const [isPeakDate, setIsPeakDate] = React.useState<boolean>(false);
  const [isInBetween, setIsInBetween] = React.useState<boolean>(false);

  /** Find out whether the date is from current month or not */
  const isDisabledDate =
    dayjs(dateStr).isBefore(
      new Date(monthAndYear[1], monthAndYear[0]),
      "month",
    ) ||
    dayjs(dateStr).isAfter(new Date(monthAndYear[1], monthAndYear[0]), "month");

  React.useEffect(() => {
    updatePosition();
  }, [startDate, endDate]);

  function updatePosition() {
    if (!startDate && !endDate) return;

    const d = dayjs(dateStr);

    if (startDate) {
      d.isSame(startDate) && setIsPeakDate(true);
    }

    if (endDate) {
      d.isSame(endDate) && setIsPeakDate(true);
    }

    if (startDate && endDate) {
      d.isBetween(startDate, endDate, "day") && setIsInBetween(true);
    }
  }

  function handleClick() {
    if (onSelect) return onSelect(dateStr);
  }

  return (
    <button
      disabled={isDisabledDate}
      className={`text-sm flex items-end justify-end p-1 h-[60px] border-r-[1px] border-t-[1px] disabled:text-gray-300 
            ${
              isPeakDate
                ? "bg-blue-400 text-white"
                : isInBetween
                ? "bg-blue-100"
                : "bg-white"
            }`}
      onClick={handleClick}
    >
      {dayjs(dateStr).date()}
    </button>
  );
};

export default DateBtn;
