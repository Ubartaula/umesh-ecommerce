import { Space, Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-1 bottom-1 right-1 left-1 bg-gray-200 opacity-50 flex items-center justify-center">
      <Spin size="large" className="mr-4   " />

      <p className="animate-bounce text-blue-500 text-2xl">Loading page...</p>
    </div>
  );
};

export default Loading;
