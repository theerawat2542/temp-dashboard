"use client";
import { RepairI } from "@/app/types/repair-type";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  data: RepairI[];
  fetchRepairData: (plant: string | null) => Promise<any>;
};

const RepairComponent = ({ data, fetchRepairData }: Props) => {
  const searchParams = useSearchParams();
  const plant = searchParams.get("plant");
  const [dataList, setdataList] = useState(data);

  useEffect(() => {
    const interval = setInterval(async () => {
      const updateData = await fetchRepairData(plant);
      setdataList(updateData);
    }, 1000 * 5);

    return () => {
      clearInterval(interval);
    };
  }, [plant]);

  if (dataList.length < 1) {
    return <div>No Data!</div>;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default RepairComponent;
