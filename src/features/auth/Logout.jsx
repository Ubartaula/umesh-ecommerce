import React, { useEffect } from "react";
import { useSendLogoutMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "./authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutMutation, { isSuccess }] = useSendLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation();
      dispatch(setLogout());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
