import React from "react";
import { ImSpinner2 } from "react-icons/im";

const loading = () => {
  return (
    <div className="h-[calc(100vh-80px)] overflow-auto w-full text-blue-600 flex flex-col justify-center items-center">
      <ImSpinner2 className="animate-spin" size={30} />
      <p>loading...</p>
    </div>
  );
};

export default loading;
