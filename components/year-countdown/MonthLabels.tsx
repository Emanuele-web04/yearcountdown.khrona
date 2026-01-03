import { MonthData } from "./types";

interface MonthLabelsProps {
  months: MonthData[];
  monthPercentage: number;
}

export function MonthLabels({ months, monthPercentage }: MonthLabelsProps) {
  return (
    <div className="grid grid-cols-6 font-mono! justify-center gap-2 sm:gap-4 flex-wrap max-w-sm mx-auto mb-4 sm:mb-6 px-4 sm:px-0">
      {months.map((month) => {
        const isCurrentMonth = month.days.some((d) => d.isCurrentMonth);
        return (
          <div
            key={month.monthIndex}
            className="flex flex-col -space-y-1 items-center"
          >
            <div
              className={`text-[10px] sm:text-xs tracking-wide ${
                isCurrentMonth
                  ? "text-khrona-orange font-medium"
                  : "text-neutral-400 dark:text-neutral-600 "
              }`}
            >
              {month.name}
            </div>
            {isCurrentMonth && (
              <div className="text-[7px] sm:text-[8px] text-khrona-orange mt-1">
                {monthPercentage.toFixed(2)}%
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
