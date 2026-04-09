"use client";
import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import HeroImage from "./HeroImage";
import MonthGrid from "./MonthGrid";
import NotesPanel from "./NotesPanel";
import MonthNavigation from "./MonthNavigation";
import { useDateRange } from "@/hooks/useDateRange";
import { useNotes } from "@/hooks/useNotes";
import { HOLIDAYS } from "@/lib/holidays";
import { MONTH_IMAGES } from "@/lib/images";

export default function CalendarShell() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [animKey, setAnimKey] = useState(0);

  const { range, handleDayClick, clearRange } = useDateRange();
  const monthKey = format(currentDate, "yyyy-MM");
  const { notes, saveNote, deleteNote } = useNotes(monthKey);

  const goNext = () => {
    setDirection(1);
    setAnimKey((k) => k + 1);
    setCurrentDate((d) => addMonths(d, 1));
  };

  const goPrev = () => {
    setDirection(-1);
    setAnimKey((k) => k + 1);
    setCurrentDate((d) => subMonths(d, 1));
  };

  // Page-flip variants: rotates around top edge like turning a calendar page
  const pageVariants = {
    enter: (dir: number) => ({
      rotateX: dir > 0 ? -90 : 90,
      opacity: 0,
      transformOrigin: "top center",
    }),
    center: {
      rotateX: 0,
      opacity: 1,
      transformOrigin: "top center",
    },
    exit: (dir: number) => ({
      rotateX: dir > 0 ? 90 : -90,
      opacity: 0,
      transformOrigin: "top center",
    }),
  };

  return (
    <div
      className="
        bg-stone-50 rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full mx-auto
        flex flex-col
        border border-gray-100
      "
      style={{ perspective: "1200px" }}
    >
      {/* Spiral binding */}
      <div className="flex justify-center gap-3 py-2.5 bg-linear-to-r from-gray-100 via-gray-50 to-gray-100 border-b border-gray-200 z-10 relative">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white shadow-inner"
          />
        ))}
      </div>

      {/* Animated page */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={animKey}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col md:flex-row"
        >
          {/* Left: Image + Month Label BELOW image */}
          <div className="md:w-[45%] flex flex-col">
            <HeroImage
              src={MONTH_IMAGES[format(currentDate, "MMMM").toLowerCase()]}
            />

            {/* Month label — now clearly BELOW image, not overlapping */}
            <div className="bg-blue-300 text-white px-6 py-5 flex flex-col justify-center">
              <p className="text-4xl font-extralight tracking-wide leading-none">
                {format(currentDate, "yyyy")}
              </p>
              <p className="text-3xl font-black uppercase tracking-[0.15em] mt-1">
                {format(currentDate, "MMMM")}
              </p>
            </div>
          </div>

          {/* Right: Grid + Notes */}
          <div className="md:w-[55%] p-6 flex flex-col gap-5 bg-white">
            <MonthNavigation
              onPrev={goPrev}
              onNext={goNext}
              label={format(currentDate, "MMMM yyyy")}
            />

            <MonthGrid
              currentDate={currentDate}
              range={range}
              onDayClick={handleDayClick}
              holidays={HOLIDAYS}
            />

            <NotesPanel
              notes={notes}
              range={range}
              onSave={saveNote}
              onDelete={deleteNote}
              onClearRange={clearRange}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
