interface Props {
  onPrev: () => void;
  onNext: () => void;
  label: string;
}

export default function MonthNavigation({ onPrev, onNext, label }: Props) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrev}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 font-bold text-lg"
      >
        ‹
      </button>
      <span className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
        {label}
      </span>
      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 font-bold text-lg"
      >
        ›
      </button>
    </div>
  );
}
