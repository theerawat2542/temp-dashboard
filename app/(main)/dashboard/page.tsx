import React from "react";
import Dashboard from "../components/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
