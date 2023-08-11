import React, { useRef, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { currentToken } from "../features/auth/authSlice";
import { useRefreshMutation } from "../features/auth/authApiSlice";

const RootLayout = () => {
  return (
    <main className="max-w-screen">
      <NavBar />

      <Outlet />
    </main>
  );
};

export default RootLayout;
