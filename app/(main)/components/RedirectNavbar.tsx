"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import CurrentTime from "./CurrentTime";

type Props = {
  plant: string;
  //   fetchRepairData: (plant: string | null) => Promise<any>;
};

const RedirectNavbar = ({ plant }: Props) => {
  const [plantName, setplantName] = useState(plant);
  const router = useRouter();

  function handlePlantSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setplantName(event.target.value);
    router.push(`/repair?plant=${event.target.value}`);
  }

  return (
    <nav className="h-8 md:h-12 xl:h-20 w-full flex items-center text-haier-text-gray bg-gradient-to-b from-haier-dark to-haier-blue bg-opacity-20 text-[11px] lg:text-lg box-border pr-8 lg:pr-4">
      {/* Title */}
      <div className="py-6 pl-3 pr-8 border-r-2 border-b-2 border-solid border-[#4f7ccd] rounded-br-full">
        <h1 className="text-xs md:text-lg lg:text-3xl font-extrabold tracking-wider bg-gradient-to-t from-blue-400 to-white bg-clip-text text-transparent">
          Thailand Factory Dashboard
        </h1>
      </div>
      {/* Input Parameter */}
      <div className="flex flex-grow justify-between">
        <div>
          <label htmlFor="plant">Plant:</label>
          <select
            name="plant"
            id="plant"
            className="text-[#445e81] shadow-none bg-opacity-0 bg-inherit border-2 rounded-sm border-[#193b69] focus:outline-none w-14"
            value={plant}
            onChange={handlePlantSelectChange}
          >
            <option value="9771">RF</option>
            <option value="9773">WAC</option>
            <option value="9774">SAC</option>
          </select>
        </div>
        {/* Current Time */}
        <div className="font-semibold text-[16px] pr-7">
          <CurrentTime />
        </div>
      </div>
    </nav>
  );
};

export default RedirectNavbar;
