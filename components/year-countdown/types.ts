export interface DayInfo {
  date: Date;
  isCurrentDay: boolean;
  isPast: boolean;
  isFuture: boolean;
  isCurrentMonth: boolean;
}

export interface MonthData {
  name: string;
  days: DayInfo[];
  monthIndex: number;
}

