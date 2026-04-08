import { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import DayCell from "./DayCell";
import { DateRange } from "@/types/calendar";

interface Props {
  currentDate: Date;
  range: DateRange;
  onDayClick: (date: Date) => void;
  holidays: Record<string, string>; // "YYYY-MM-DD" -> holiday name
}

export default function MonthGrid({
  currentDate,
  range,
  onDayClick,
  holidays,
}: Props) {
  const days = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  // Leading empty cells (Mon-based week)
  const leadingBlanks = (getDay(days[0]) + 6) % 7;

  const isInRange = (date: Date) => {
    if (!range.start || !range.end) return false;
    return isWithinInterval(date, { start: range.start, end: range.end });
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {/* Weekday headers */}
      {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
        <div
          key={d}
          className={`text-center text-xs font-semibold py-2
          ${d === "SAT" || d === "SUN" ? "text-blue-500" : "text-gray-400"}`}
        >
          {d}
        </div>
      ))}

      {/* Blanks */}
      {Array.from({ length: leadingBlanks }).map((_, i) => (
        <div key={`blank-${i}`} />
      ))}

      {/* Days */}
      {days.map((day) => (
        <DayCell
          key={day.toISOString()}
          date={day}
          isStart={range.start ? isSameDay(day, range.start) : false}
          isEnd={range.end ? isSameDay(day, range.end) : false}
          isInRange={isInRange(day)}
          isWeekend={getDay(day) === 0 || getDay(day) === 6}
          holiday={holidays[format(day, "yyyy-MM-dd")]}
          onClick={() => onDayClick(day)}
        />
      ))}
    </div>
  );
}
