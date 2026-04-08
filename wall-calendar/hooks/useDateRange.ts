import { useState, useCallback } from "react";
import { DateRange } from "@/types/calendar";

export function useDateRange() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [selecting, setSelecting] = useState(false);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (!selecting || !range.start) {
        // First click: set start
        setRange({ start: date, end: null });
        setSelecting(true);
      } else {
        // Second click: set end (ensure start <= end)
        const [s, e] =
          date < range.start ? [date, range.start] : [range.start, date];
        setRange({ start: s, end: e });
        setSelecting(false);
      }
    },
    [selecting, range.start],
  );

  const clearRange = () => {
    setRange({ start: null, end: null });
    setSelecting(false);
  };

  return { range, selecting, handleDayClick, clearRange };
}
