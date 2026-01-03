import { DayInfo } from "./types";

interface DayDotProps {
  day: DayInfo;
}

export function DayDot({ day }: DayDotProps) {
  const baseSize = 6; // 6px base size
  const biggerSize = baseSize * 1.5; // 30% bigger for current day

  let className = "";

  if (day.isCurrentDay) {
    className = "bg-khrona-orange";
  } else if (day.isCurrentMonth && day.isFuture) {
    className = "bg-khrona-orange opacity-20";
  } else if (day.isPast) {
    className = "bg-black dark:bg-black";
  } else {
    className = "bg-neutral-200 dark:bg-neutral-800";
  }

  return (
    <div
      className={`rounded-full ${className} transition-all`}
      style={{
        width: day.isCurrentDay ? `${biggerSize}px` : `${baseSize}px`,
        height: day.isCurrentDay ? `${biggerSize}px` : `${baseSize}px`,
      }}
      title={day.date.toLocaleDateString()}
    />
  );
}
