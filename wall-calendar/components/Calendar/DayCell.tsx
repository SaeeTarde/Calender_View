import { motion } from "framer-motion";
import { format } from "date-fns";

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

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      title={holiday}
      className={`
        relative flex items-center justify-center rounded-full w-8 h-8 mx-auto text-sm font-medium
        transition-colors duration-150 cursor-pointer
        ${isEdge ? "bg-blue-500 text-white" : ""}
        ${isInRange && !isEdge ? "bg-blue-100 text-blue-800 rounded-none" : ""}
        ${!isEdge && !isInRange && isWeekend ? "text-blue-500" : ""}
        ${!isEdge && !isInRange && !isWeekend ? "text-gray-700 hover:bg-gray-100" : ""}
      `}
    >
      {format(date, "d")}
      {holiday && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-400" />
      )}
    </motion.button>
  );
}
