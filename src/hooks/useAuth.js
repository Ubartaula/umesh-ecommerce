import React from "react";
import { useSelector } from "react-redux";
import { currentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(currentToken);

  if (token) {
    const decodedToken = jwtDecode(token);
    const { username, roles, userId } = decodedToken?.UserInfo;
    return { username, roles, userId };
  }

  return { username: "", roles: [], userId: "" };
};

export default useAuth;
