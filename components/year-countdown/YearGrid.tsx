import { MonthData } from "./types";
import { DayDot } from "./DayDot";

interface YearGridProps {
  months: MonthData[];
}

export function YearGrid({ months }: YearGridProps) {
  // Flatten all days from all months
  const allDays = months.flatMap(month => month.days);
  
  return (
    <div className="flex items-center flex-wrap gap-1.5 max-w-2xl justify-start">
      {allDays.map((day, index) => (
        <DayDot key={index} day={day} />
      ))}
    </div>
  );
}

