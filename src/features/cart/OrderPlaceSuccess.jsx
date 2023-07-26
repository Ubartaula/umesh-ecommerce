import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

const OrderPlaceSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center p-2">
      <Result
        status="success"
        title="Successfully Order Placed!"
        // extra={[]}
      />
      <div className="flex flex-row ">
        <button
          key={"1"}
          onClick={() => navigate("/dash/customer-profile")}
          className="bg-yellow-500 min-w-[8rem] p-2 rounded-md mr-2"
        >
          Go to Profile
        </button>
        <button
          key={"2"}
          onClick={() => navigate("/dash")}
          className="bg-yellow-500 p-2 min-w-[8rem] rounded-md"
        >
          Continue Buying
        </button>
      </div>
    </div>
  );
};

export default OrderPlaceSuccess;
