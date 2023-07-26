import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
const CustomerNavBar = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const { username } = useAuth();

  return (
    <div className="bg-sky-300 px-2 min-h-[2.5rem] flex flex-col sm:flex sm:flex-row  items-center  p-1 ">
      <div
        onClick={() => navigate("/dash")}
        className="text-sm bg-yellow-500 min-w-full sm:min-w-[10rem] rounded-md border-2 hover:border-pink-500   hover:cursor-pointer sm:mr-1 p-1 text-center"
      >
        Continue Shopping ?
      </div>

      <div
        onClick={() => navigate("/dash/wish_lists/user")}
        className="text-sm bg-yellow-500 min-w-full sm:min-w-[10rem] rounded-md border-2 hover:border-pink-500   hover:cursor-pointer sm:mr-1 p-1 text-center"
      >
        My Wish List
      </div>
    </div>
  );
};

export default CustomerNavBar;
