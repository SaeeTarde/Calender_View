interface Props {
  onPrev: () => void;
  onNext: () => void;
  label: string;
}

export default function MonthNavigation({ onPrev, onNext, label }: Props) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
      <button
        onClick={onPrev}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-all text-xl font-bold"
      >
        ‹
      </button>
      <span className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">
        {label}
      </span>
      <button
        onClick={onNext}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-all text-xl font-bold"
      >
        ›
      </button>
    </div>
  );
}
