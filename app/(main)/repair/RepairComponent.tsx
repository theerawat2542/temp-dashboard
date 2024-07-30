"use client";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import RepairStation from "./RepairStation";
import { RepairI } from "@/app/types/repair-type";

const RepairComponent = () => {
  const searchParams = useSearchParams();
  const plant = searchParams.get("plant");
  const [dataList, setdataList] = useState<RepairI[]>([]);

  const fetchRepairData = useCallback(() => {
    fetch(`/api/repair_rate?plant=${plant}`)
      .then((res) => res.json())
      .then((data) => setdataList(data.rows));
  }, [plant]);

  useEffect(() => {
    fetchRepairData();
    const interval = setInterval(async () => {
      fetchRepairData();
    }, 1000 * 5);

    return () => {
      clearInterval(interval);
    };
  }, [fetchRepairData]);

  const lineList = dataList
    .map(({ line_code }) => line_code)
    .reduce((acc, curr) => {
      // If the accumulator (acc) does not already include the current value (curr)
      if (!acc.includes(curr)) {
        // Add the current value to the accumulator
        acc.push(curr);
      }
      // Return the updated accumulator for the next iteration
      return acc;
    }, [] as string[]);

  return (
    <div className="mt-5 container mx-auto h-[screen-80px]">
      {lineList.map((line) => (
        <div className="m-3" key={line}>
          <div className="border-2 border-haier-blue p-2 text-center mb-3 text-white">
            {line}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {dataList
              .filter(({ line_code }) => line_code === line)
              .sort((a, b) => a.rank - b.rank)
              .map((item) => (
                <RepairStation repairData={item} key={item.rank} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepairComponent;
