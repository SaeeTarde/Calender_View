export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  content: string;
  date?: string; // ISO string, optional (month-level notes)
  rangeStart?: string;
  rangeEnd?: string;
  createdAt: string;
}

export interface CalendarState {
  currentDate: Date;
  selectedRange: DateRange;
  notes: Note[];
  theme: "light" | "dark";
}
