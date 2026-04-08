"use client";
import { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
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
  const { range, handleDayClick, clearRange } = useDateRange();
  const monthKey = format(currentDate, "yyyy-MM");
  const { notes, saveNote, deleteNote } = useNotes(monthKey);

  return (
    <div
      className="
      bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full mx-auto
      flex flex-col md:flex-row
      border border-gray-100
    "
    >
      {/* Left: Image + Month Header */}
      <div className="md:w-1/2 flex flex-col">
        {/* Spiral binding visual */}
        <div className="flex justify-center gap-3 py-2 bg-gray-50">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 border-gray-300 bg-white"
            />
          ))}
        </div>

        <HeroImage
          src={MONTH_IMAGES[format(currentDate, "MMMM").toLowerCase()]}
        />

        {/* Blue diagonal month label */}
        <div className="relative bg-blue-500 text-white p-6 clip-diagonal">
          <p className="text-5xl font-light">{format(currentDate, "yyyy")}</p>
          <p className="text-3xl font-bold uppercase tracking-widest">
            {format(currentDate, "MMMM")}
          </p>
        </div>
      </div>

      {/* Right: Grid + Notes */}
      <div className="md:w-1/2 p-6 flex flex-col gap-6">
        <MonthNavigation
          onPrev={() => setCurrentDate((d) => subMonths(d, 1))}
          onNext={() => setCurrentDate((d) => addMonths(d, 1))}
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
    </div>
  );
}
