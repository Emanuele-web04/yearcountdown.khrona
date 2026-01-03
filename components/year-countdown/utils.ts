import { DayInfo, MonthData } from "./types";

export function getYearData(year: number): MonthData[] {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  return months.map((name, monthIndex) => {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const days: DayInfo[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      const isCurrentDay = year === currentYear && monthIndex === currentMonth && day === currentDay;
      const isPast = year < currentYear || 
                     (year === currentYear && monthIndex < currentMonth) ||
                     (year === currentYear && monthIndex === currentMonth && day < currentDay);
      const isFuture = year > currentYear ||
                       (year === currentYear && monthIndex > currentMonth) ||
                       (year === currentYear && monthIndex === currentMonth && day > currentDay);
      const isCurrentMonth = year === currentYear && monthIndex === currentMonth;

      days.push({
        date,
        isCurrentDay,
        isPast,
        isFuture,
        isCurrentMonth,
      });
    }

    return {
      name,
      days,
      monthIndex,
    };
  });
}

export function calculateYearProgress(): {
  percentageComplete: number;
  percentagePassed: number;
  percentageRemaining: number;
  daysPassed: number;
  totalDays: number;
} {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
  const totalDays = 365 + (isLeapYear(today.getFullYear()) ? 1 : 0);
  
  const dayOfYear = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  const percentageComplete = (dayOfYear / totalDays) * 100;
  const percentagePassed = percentageComplete;
  const percentageRemaining = 100 - percentageComplete;

  return {
    percentageComplete,
    percentagePassed,
    percentageRemaining,
    daysPassed: dayOfYear,
    totalDays,
  };
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function calculateMonthProgress(): number {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  return (currentDay / daysInMonth) * 100;
}

