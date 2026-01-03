interface ProgressTextProps {
  percentagePassed: number;
  percentageRemaining: number;
}

export function ProgressText({
  percentagePassed,
  percentageRemaining,
}: ProgressTextProps) {
  return (
    <div className="text-center text-xxs tracking-tighter font-mono text-neutral-500 dark:text-neutral-500 px-4 sm:px-6">
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-100" />
          <span className="font-medium">
            {percentagePassed.toFixed(2)}% passed
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          <span className="font-medium">
            {percentageRemaining.toFixed(2)}% remaining
          </span>
        </div>
      </div>
    </div>
  );
}
