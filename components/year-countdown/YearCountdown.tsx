/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import {
  getYearData,
  calculateYearProgress,
  calculateMonthProgress,
} from "./utils";
import { YearGrid } from "./YearGrid";
import { YearProgress } from "./YearProgress";
import { ProgressText } from "./ProgressText";
import { MonthLabels } from "./MonthLabels";
import { motivationalMessages } from "@/lib/motivational-quotes";
import Link from "next/link";
import { LuArrowUpToLine } from "react-icons/lu";

export function YearCountdown() {
  const currentYear = new Date().getFullYear();
  const today = new Date();
  const months = getYearData(currentYear);
  const {
    percentageComplete,
    percentagePassed,
    percentageRemaining,
    daysPassed,
    totalDays,
  } = calculateYearProgress();
  const monthPercentage = calculateMonthProgress();

  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });
  const day = today.getDate();
  const monthName = today.toLocaleDateString("en-US", { month: "long" });

  const [randomQuote] = useState(() => {
    return motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];
  });

  const exportRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!exportRef.current) return;

    setIsExporting(true);

    try {
      // Detect dark mode
      const isDark = document.documentElement.classList.contains("dark");
      const backgroundColor = isDark ? "#030712" : "#ffffff";

      const dataUrl = await toPng(exportRef.current, {
        quality: 1,
        pixelRatio: 4, // High quality export for sharp images
        backgroundColor,
        cacheBust: true,
        canvasWidth: exportRef.current.offsetWidth * 4,
        canvasHeight: exportRef.current.offsetHeight * 4,
        filter: (node) => {
          // Exclude any elements marked for export exclusion
          if (node instanceof Element) {
            return !node.classList.contains("export-exclude");
          }
          return true;
        },
      });

      const link = document.createElement("a");
      link.download = `khrona-countdown-${currentYear}-${day}-${monthName.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error exporting image:", error);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-lg">
        {/* Content Card */}
        <div
          ref={exportRef}
          className=" dark:bg-gray-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 py-4 sm:py-6"
        >
          {/* Header */}
          <div className="flex mb-6 sm:mb-12 pl-3 sm:pl-4 w-full justify-between items-center">
            <img
              src="/minik-min.png"
              alt="Minil Mini"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <div className="flex font-mono! tracking-tighter text-xxs sm:text-xs! items-center justify-end gap-0.5 sm:gap-1 pr-3 sm:pr-4">
              <div className="px-2 sm:px-4 py-1 sm:py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                <span className=" text-neutral-800 dark:text-neutral-600">
                  {dayOfWeek}
                </span>
              </div>
              <span className="animate-pulse text-xxs sm:text-xs">:</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-full">
                <span className="text-xxs sm:text-xs text-neutral-800 dark:text-neutral-600">
                  {day}
                </span>
              </div>
              <div className="px-2 sm:px-4 py-1 sm:py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                <span className="text-xxs sm:text-xs text-neutral-800 dark:text-neutral-600">
                  {monthName}
                </span>
              </div>
              <div className="px-2 sm:px-4 py-1 sm:py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full">
                <span className="text-xxs sm:text-xs text-neutral-800 dark:text-neutral-600">
                  {currentYear}
                </span>
              </div>
            </div>
          </div>
          {/* Tagline */}
          <p className="text-center mt-12 text-xs sm:text-sm font-mono tracking-tighter text-black dark:text-white mb-6 sm:mb-8 px-4 sm:px-6 leading-relaxed">
            {randomQuote}
          </p>

          {/* Month Labels */}
          <MonthLabels months={months} monthPercentage={monthPercentage} />

          {/* Year Grid with Dots */}
          <div className="flex justify-center mb-8 sm:mb-12 px-4 sm:px-12 py-6 sm:py-12">
            <YearGrid months={months} />
          </div>

          {/* Progress Text */}
          <ProgressText
            percentagePassed={percentagePassed}
            percentageRemaining={percentageRemaining}
          />

          {/* Year Progress Bar */}
          <div className="mt-6 sm:mt-8 px-4 sm:px-12">
            <YearProgress
              percentage={percentageComplete}
              daysPassed={daysPassed}
              totalDays={totalDays}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-3 sm:mt-1 flex gap-2">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 py- flex items-center justify-center sm:py-3 px-4 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-full font-mono text-xxs sm:text-xs tracking-tighter hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <LuArrowUpToLine className="inline-block mr-1 size-3 align-text-bottom" />
            {isExporting ? "Exporting..." : "Export"}
          </button>
          <Link
            href="https://apps.apple.com/us/app/khrona-get-your-life-together/id6744410827"
            target="_blank"
            className="flex-1 py-2 sm:py-3 px-4 bg-black flex items-center justify-center dark:bg-white text-white dark:text-black rounded-full font-mono text-xxs sm:text-xs tracking-tighter hover:opacity-90 transition-opacity"
          >
             Get the app
          </Link>
        </div>
      </div>
    </div>
  );
}
