import React from "react";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Report",
  description: "Thailand Report",
};

const ReportLayout = ({ children }: Props) => {
  return (
    <div className="mx-10 lg:mx-5 bg-[url('/assets/images/mainbg.png')] bg-cover h-screen">
      {children}
    </div>
  );
};

export default ReportLayout;
