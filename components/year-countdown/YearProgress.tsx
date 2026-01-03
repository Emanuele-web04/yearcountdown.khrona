interface YearProgressProps {
  percentage: number;
  daysPassed: number;
  totalDays: number;
}

export function YearProgress({
  percentage,
  daysPassed,
  totalDays,
}: YearProgressProps) {
  return (
    <div className="w-full font-mono! text-xs">
      <div className="relative w-full h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-black dark:bg-white transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-center tracking-tighter text-xs text-neutral-800 dark:text-neutral-600 mt-3 font-medium">
        {daysPassed} of {totalDays} days
      </div>
      <p className="text-center tracking-tighter text-[8px] animate-pulse text-neutral-600 dark:text-neutral-600 mt-8 font-regular">I believe in you.</p>
    </div>
  );
}
