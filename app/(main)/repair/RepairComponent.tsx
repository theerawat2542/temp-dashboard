"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const RepairComponent = () => {
  const searchParams = useSearchParams();
  const plant = searchParams.get("plant");
  const [dataList, setdataList] = useState([]);

  function fetchRepairData() {
    fetch(`/api/repair_rate?plant=${plant}`)
      .then((res) => res.json())
      .then((data) => setdataList(data.rows));
  }

  useEffect(() => {
    fetchRepairData();
    const interval = setInterval(async () => {
      fetchRepairData();
    }, 1000 * 5);

    return () => {
      clearInterval(interval);
    };
  }, [plant]);

  return (
    <div className="mt-5">
      <table className="text-white">
        <thead>
          <tr>
            <th>line</th>
            <th>scan station</th>
            <th>input</th>
            <th>output</th>
            <th>remain</th>
          </tr>
        </thead>
        <tbody>
          {dataList?.map(
            ({
              input_qty,
              output_qty,
              remain_qty,
              line_code,
              scan_station,
            }) => (
              <tr key={line_code + scan_station}>
                <td>{line_code}</td>
                <td>{scan_station}</td>
                <td>{input_qty}</td>
                <td>{output_qty}</td>
                <td>{remain_qty}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Layout */}
      <div></div>
    </div>
  );
};

export default RepairComponent;
