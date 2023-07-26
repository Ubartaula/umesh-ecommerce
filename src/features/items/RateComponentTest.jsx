import { Rate } from "antd";
import React, { useState } from "react";

const RateComponent = () => {
  const [count, setCount] = useState(0);
  const handleSubmit = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      {/* <Rate
        defaultValue={4}
        onChange={(value) => setCount(value)}
        className="mb-2 mt-1 gap-2 h-fit"
      /> */}
      <textarea
        name=""
        id=""
        rows="2"
        placeholder="write comment here ... "
        className=" resize-none w-full mt-2  border-2 border-gray-300 px-1 bg-white"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-pink-300 border-2 
      box-border border-pink-300 rounded-sm
       hover:bg-green-500 hover:text-white"
      >
        Submit
      </button>
    </div>
  );
};

export default React.memo(RateComponent);
