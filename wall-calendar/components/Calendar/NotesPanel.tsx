"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Note, DateRange } from "@/types/calendar";

interface Props {
  notes: Note[];
  range: DateRange;
  onSave: (content: string, rangeStart?: string, rangeEnd?: string) => void;
  onDelete: (id: string) => void;
  onClearRange: () => void;
}

export default function NotesPanel({
  notes,
  range,
  onSave,
  onDelete,
  onClearRange,
}: Props) {
  const [text, setText] = useState("");

  const handleSave = () => {
    if (!text.trim()) return;
    onSave(
      text.trim(),
      range.start ? range.start.toISOString() : undefined,
      range.end ? range.end.toISOString() : undefined,
    );
    setText("");
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Notes
      </p>

      {range.start && (
        <div className="text-xs text-blue-500 flex items-center justify-between">
          <span>
            {format(range.start, "MMM d")}
            {range.end
              ? ` → ${format(range.end, "MMM d")}`
              : " (select end date)"}
          </span>
          <button
            onClick={onClearRange}
            className="text-gray-400 hover:text-red-400 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a note for this month or selected range..."
        rows={3}
        className="w-full border border-gray-200 rounded-lg p-2 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <button
        onClick={handleSave}
        disabled={!text.trim()}
        className="self-end px-4 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-40 transition-colors"
      >
        Save Note
      </button>

      <div className="flex flex-col gap-2 mt-1 max-h-40 overflow-y-auto">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-sm text-gray-700 flex justify-between items-start gap-2"
          >
            <div>
              {note.rangeStart && (
                <p className="text-xs text-blue-400 mb-0.5">
                  {format(new Date(note.rangeStart), "MMM d")}
                  {note.rangeEnd
                    ? ` → ${format(new Date(note.rangeEnd), "MMM d")}`
                    : ""}
                </p>
              )}
              <p>{note.content}</p>
            </div>
            <button
              onClick={() => onDelete(note.id)}
              className="text-gray-300 hover:text-red-400 shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
