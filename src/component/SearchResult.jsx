import { Result } from "antd";
import React from "react";

const SearchResult = () => {
  return (
    <div className="flex items-center justify-center">
      <Result
        status="error"
        title="Search Could Not find"
        subTitle="Please check search key and try again."
      />
    </div>
  );
};

export default SearchResult;
