"use client";
import { motion } from "framer-motion";
import { format, isToday } from "date-fns";

interface Props {
  date: Date;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  isWeekend: boolean;
  holiday?: string;
  onClick: () => void;
}

export default function DayCell({
  date,
  isStart,
  isEnd,
  isInRange,
  isWeekend,
  holiday,
  onClick,
}: Props) {
  const isEdge = isStart || isEnd;
  const today = isToday(date);

  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={holiday}
      className={`
        relative flex items-center justify-center w-9 h-9 mx-auto text-sm font-medium
        transition-colors duration-150 cursor-pointer select-none
        ${isEdge ? "rounded-full bg-blue-500 text-white shadow-md shadow-blue-200" : ""}
        ${isInRange && !isEdge ? "bg-blue-100 text-blue-700 rounded-sm" : ""}
        ${today && !isEdge ? "ring-2 ring-blue-400 ring-offset-1 rounded-full" : ""}
        ${!isEdge && !isInRange && isWeekend ? "text-blue-500 rounded-full" : ""}
        ${!isEdge && !isInRange && !isWeekend ? "text-gray-600 hover:bg-gray-100 rounded-full" : ""}
      `}
    >
      {format(date, "d")}
      {holiday && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-rose-400" />
      )}
    </motion.button>
  );
}
