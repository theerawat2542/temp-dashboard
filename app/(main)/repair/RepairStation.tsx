import { RepairI } from "@/app/types/repair-type";
import React from "react";

type Props = {
  repairData: RepairI;
};

function displayStation(scan: string) {
  if (scan.includes("Cooling") || scan.includes("Leak Check")) {
    return "Cooling Test & Leak Check";
  }
  return scan;
}

const RepairStation = ({ repairData }: Props) => {
  const { input_qty, output_qty, remain_qty, line_code, scan_station, rank } =
    repairData;

  let stationName: string;

  return (
          <div className="relative">
      <div className="bg-slate-400 m-3 p-2 rounded-sm">
        <div>Repair Station: {rank}</div>
        <div className="flex justify-between">
          <text>input:</text>
          <text>{input_qty}</text>
        </div>
        <div className="flex justify-between">
          <text>output:</text>
          <text>{output_qty}</text>
        </div>
        <div
          className={`${
            remain_qty > 0 ? "text-orange-600" : "text-emerald-600"
          } flex justify-between text-lg font-semibold`}
        >
          <text className="">remain:</text>
          <text>{remain_qty}</text>
        </div>
      </div>

      <div className="bg-haier-blue text-white p-1 absolute -top-1 right-0 mt-2 mr-4 text-xs rounded-md">{displayStation(scan_station)}</div>
    </div>
  );
};

export default RepairStation;
