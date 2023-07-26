import React from "react";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const NotFound = () => {
  useTitle("404:Not Found");
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 p-2 rounded-md"
        >
          Back Home
        </button>
      }
    />
  );
};

export default NotFound;
