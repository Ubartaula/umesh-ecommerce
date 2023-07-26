import React, { useRef, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import { currentToken } from "../features/auth/authSlice";
import { useRefreshMutation } from "../features/auth/authApiSlice";

const RootLayout = () => {
  // const token = useSelector(currentToken);
  // const [refresh] = useRefreshMutation();
  // const effectRan = useRef(false);

  // useEffect(() => {
  //   if (effectRan.current === true || process.env.NODE_ENV !== "development") {
  //     const verifyRefreshToken = async () => {
  //       try {
  //         await refresh();
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };

  //     if (!token) verifyRefreshToken();
  //   }

  //   return () => (effectRan.current = true);
  // }, []);

  return (
    <main>
      <NavBar />

      <Outlet />
    </main>
  );
};

export default RootLayout;
