"use client";

import { useState } from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css
declare module "react-date-range";

interface WeekSelectorProps {
  onConfirm: (weekData: string) => void;
}

export default function WeekSelector({ onConfirm }: WeekSelectorProps) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleConfirm = () => {
    const { startDate, endDate } = range[0];
    if (!startDate || !endDate) return;
    const start = format(startDate, "yyyy-MM-dd");
    const end = format(endDate, "yyyy-MM-dd");
    onConfirm(`start=${start}&end=${end}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Select a Week</h1>
        <DateRange
          editableDateInputs={true}
          onChange={(item: RangeKeyDict) => {
            const selection = item.selection;
            if (selection.startDate && selection.endDate) {
              setRange([selection as { startDate: Date; endDate: Date; key: string }]);
            }
          }}
          moveRangeOnFirstSelection={false}
          ranges={range}
          rangeColors={["#3b82f6"]}
          months={1}
          direction="horizontal"
        />
        <button
          disabled={!range[0].startDate || !range[0].endDate}
          onClick={handleConfirm}
          className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
