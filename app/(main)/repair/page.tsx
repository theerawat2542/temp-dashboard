import React from "react";
import RepairComponent from "./RepairComponent";

type Props = {
  searchParams: {
    plant: string;
  };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchRepairData(plant: string | null) {
  "use server";
  const res = await fetch(`${API_URL}/api/repair_rate?plant=${plant}`, {
    cache: "no-cache",
  }).then((res) => res.json());
  return res;
}

const RepairPage = async ({ searchParams }: Props) => {
  // const data = searchParams.plant
  const data = await fetchRepairData(searchParams.plant);
  return (
    <section>
      {/* Navbar */}
      <RepairComponent data={data} fetchRepairData={fetchRepairData} />
    </section>
  );
};

export default RepairPage;
