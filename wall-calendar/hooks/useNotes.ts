import { useState, useEffect } from "react";
import { Note } from "@/types/calendar";

export function useNotes(monthKey: string) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`calendar-notes-${monthKey}`);
    if (stored) setNotes(JSON.parse(stored));
  }, [monthKey]);

  const saveNote = (
    content: string,
    rangeStart?: string,
    rangeEnd?: string,
  ) => {
    const note: Note = {
      id: crypto.randomUUID(),
      content,
      rangeStart,
      rangeEnd,
      createdAt: new Date().toISOString(),
    };
    const updated = [...notes, note];
    setNotes(updated);
    localStorage.setItem(`calendar-notes-${monthKey}`, JSON.stringify(updated));
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem(`calendar-notes-${monthKey}`, JSON.stringify(updated));
  };

  return { notes, saveNote, deleteNote };
}
