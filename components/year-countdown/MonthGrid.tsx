import { MonthData } from "./types";
import { DayDot } from "./DayDot";

interface MonthGridProps {
  month: MonthData;
}

export function MonthGrid({ month }: MonthGridProps) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <div className="text-xxs font-medium text-neutral-800 dark:text-neutral-600 tracking-wider uppercase">
        {month.name}
      </div>
      <div className="flex flex-wrap gap-1">
        {month.days.map((day, index) => (
          <DayDot key={index} day={day} />
        ))}
      </div>
    </div>
  );
}
