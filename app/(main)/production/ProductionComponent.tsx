"use client";
import { ECOption } from "@/app/types/chart-type";
import moment from "moment";
import React, { useEffect, useState, useCallback, ChangeEvent } from "react";
import { Range } from "react-date-range";
import Navbar from "../components/Navbar";
import { ImSpinner2 } from "react-icons/im";
import EChartComponent from "../components/EChartComponent";

const ProductionComponent = () => {
  const [plant] = useState<string>("9771");
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: moment().startOf("month").toDate(),
      endDate: moment().endOf("month").toDate(),
      key: "selection",
    },
  ]);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [chartData, setchartData] = useState([]);
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const fetchingData = useCallback(async () => {
    console.log("fetching completerate data...");
    setisLoading(true);
    const { startDate, endDate } = dateRange[0];
    const startDateStr = moment(startDate).format("YYYY-MM-DD");
    const endDateStr = moment(endDate).format("YYYY-MM-DD");

    try {
      const { rows } = await fetch(
        `/api/completerate?startdate=${startDateStr}&enddate=${endDateStr}`
      ).then((res) => res.json());
      setchartData(rows);
    } catch (error) {
      alert("Something went wrong! Please contact IT department");
      console.log("error:", error);
    } finally {
      setisLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchingData();
    }, 5 * 60 * 1000);

    // Call fetchingData immediately when the component mounts
    fetchingData();

    // Clear the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [fetchingData]);

  const onsubmit = async () => {
    fetchingData();
  };

  const categories: string[] = chartData.map(({ ProdDate }: any) =>
    moment(ProdDate).format("MM-DD")
  );
  const uniqueArr = categories.filter(
    (value, index, self) => self.indexOf(value) === index
  );
  // const arr1 = categories.forEach((item, index) => {
  //   if (condition) {
  //   }
  // });
  const pendingRateA: any[] = chartData
    .filter(({ ProdLine }: any) => ProdLine === "RA")
    .map(({ PendingRate }: any) => parseFloat(PendingRate));
  const pendingRateB: any[] = chartData
    .filter(({ ProdLine }: any) => ProdLine === "RB")
    .map(({ PendingRate }: any) => parseFloat(PendingRate));

  const duplicateArr: number[] = [];
  const filteredArr = uniqueArr.forEach((item, index: number) => {
    console.log(pendingRateA[index], pendingRateB[index])
    if (pendingRateA[index] === 0 && pendingRateB[index] === 0) {
      duplicateArr.push(index);
    }
  });
  console.log(uniqueArr);
  console.log(duplicateArr);

  const chartOption: ECOption = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Line A", "Line B"],
      top: 0,
      textStyle: {
        color: "#9cbbd7",
        fontSize: 20,
      },
    },
    xAxis: [
      {
        type: "category",
        data: uniqueArr.filter((_item, index) => !duplicateArr.includes(index)),
        axisLabel: {
          fontSize: 18,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Job Pending Rate",
        position: "left",
        min: 0,
        max: 100,
        splitLine: {
          lineStyle: {
            color: "#244668",
          },
        },
        axisLabel: {
          formatter: "{value}%",
          fontSize: 18,
        },
      },
    ],
    grid: {
      left: 80,
      containLabel: true,
    },
    series: [
      {
        name: "Line A",
        type: chartType,
        yAxisIndex: 0,
        data: pendingRateA.filter(
          (_item, index) => !duplicateArr.includes(index)
        ),
        label: {
          show: true,
          position: "top",
          formatter: "{c}",
          color: "#97a2b5",
          fontSize: 14,
        },
        itemStyle: {
          color: "#548bf3",
        },
      },
      {
        name: "Line B",
        type: chartType,
        yAxisIndex: 0,
        data: pendingRateB.filter(
          (_item, index) => !duplicateArr.includes(index)
        ),
        label: {
          show: true,
          position: "top",
          formatter: "{c}",
          color: "#97a2b5",
          fontSize: 14,
        },
        itemStyle: {
          color: "#40f4ec",
        },
      },
    ],
    textStyle: {
      color: "#9cbbd7",
      fontSize: 16,
    },
  };

  function handleChartTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    setChartType(event.target.value as "bar" | "line");
  }

  return (
    <div>
      <Navbar
        plant={plant}
        daterange={dateRange}
        setdaterange={setDateRange}
        onsubmit={onsubmit}
      />
      {isLoading && (
        <div className="h-[calc(100vh-80px)] overflow-auto w-full text-blue-600 flex flex-col justify-center items-center">
          <ImSpinner2 className="animate-spin" size={30} />
          <p>loading...</p>
        </div>
      )}
      <select
        name="charttype"
        id="charttype"
        onChange={handleChartTypeChange}
        className="text-[#445e81] shadow-none bg-opacity-0 bg-inherit border-2 rounded-sm border-[#193b69] focus:outline-none w-14"
      >
        <option value="bar">bar</option>
        <option value="line">line</option>
      </select>
      <EChartComponent chartOption={chartOption} />
    </div>
  );
};

export default ProductionComponent;
