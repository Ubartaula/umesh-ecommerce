import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import Logout from "../features/auth/Logout";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { FcHome, FcManager } from "react-icons/fc";
import useCart from "../hooks/useCart";

const NavBar = () => {
  const history = useLocation();
  // const ref = useRef(null);
  const navigate = useNavigate();

  const { username, roles } = useAuth();
  const { cartTotalQuantity } = useCart();

  const [showMenu, setShowMenu] = useState(false);

  // getting window size
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  useEffect(() => {
    //function
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    // event listener
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

    //end of event listener
  }, []);

  const [css, setCss] = useState(true);

  // handling scroll on nav bar
  // const [scrollValue, setScrollValue] = useState(0);
  // const handleScroll = () => {
  //   setScrollValue(window.scrollY);
  // };
  // useEffect(() => {
  //   if (ref.current.scrollHeight) {
  //     document.addEventListener("scroll", handleScroll);
  //   }

  //   return () => document.removeEventListener("scroll", handleScroll);
  // }, []);
  // const cssScroll = scrollValue > 10 ? "fixed top-0 left-0 right-0 " : "";

  // end of scroll

  return (
    <div className="">
      <div
        //ref={ref}
        className={`fixed top-0 left-0 right-0  px-2 w-full bg-sky-500  min-h-[3rem] max-h-[3rem] flex  gap-4 items-center z-50`}
      >
        <div className="md:hidden hover:cursor-pointer">
          <AiOutlineMenu
            onClick={() => setShowMenu((prev) => !prev)}
            className="ml-2 text-2xl"
          />
        </div>

        <div className="flex flex-row gap-3 items-center  ">
          {username && (
            <div className=" bg-black text-white p-1 px-2 rounded-md">
              Welcome {username} !
            </div>
          )}

          <button
            onClick={() => {
              setCss((prev) => !prev);
              if (username) {
                navigate("/dash");
              } else {
                navigate("/");
              }
            }}
            className=" hidden md:flex items-center px-2 rounded-lg p-1 hover:bg-yellow-500"
          >
            <FcHome className="text-2xl mr-1" />
            Home
          </button>

          {username && (
            <Link
              className=" hidden md:flex items-center px-2 rounded-lg p-1 hover:bg-yellow-500"
              to="/dash/customer-profile"
            >
              <FcManager className="text-2xl mr-1" />
              My Profile
            </Link>
          )}
          {username && (
            <Link
              className=" hidden md:block  px-2 rounded-lg p-1 hover:bg-yellow-500"
              to="/dash/wish_lists/user"
            >
              My WishList
            </Link>
          )}
        </div>
        {!username && (
          <Link
            className=" hidden sm:block px-2 rounded-lg p-1 hover:bg-yellow-500 mr-2"
            to="/login"
          >
            Login
          </Link>
        )}

        {!username && (
          <Link
            className=" hidden sm:block px-2 rounded-lg p-1 hover:bg-yellow-500 mr-2"
            to="/login"
          >
            Sing-Up
          </Link>
        )}

        <div className="md:flex items-center hidden ">
          {username && (
            <div className="p-1 px-2 rounded-lg hover:bg-yellow-500 ">
              <Logout />
            </div>
          )}
        </div>
        <div className=" absolute top-1 right-6">
          <div className="relative bg-sky-100 border rounded-md p-1 hover:cursor-pointer">
            <p className=" absolute top-[-0.5rem]  right-[-1rem] text-sm bg-yellow-500 text-white rounded-full p-1">
              {cartTotalQuantity}
            </p>
            <button
              onClick={() => {
                if (username) {
                  navigate("/dash/carts");
                } else {
                  navigate("/carts");
                }
              }}
            >
              <BsCartCheck className="font-bold text-3xl" />
            </button>
          </div>
        </div>
      </div>
      {/* mobile view */}
      <div
        className={`${showMenu ? "" : "hidden"} bg-sky-200 fixed z-50  ${
          history?.pathname.endsWith("/") || history?.pathname.endsWith("/dash")
            ? "top-[6rem]"
            : "top-[3rem]"
        } left-0 md:hidden `}
      >
        <div className=" relative  border border-gray-300 p-2 min-w-full h-l">
          <p
            typeof="button"
            onClick={() => setShowMenu((prev) => !prev)}
            className={` absolute  top-1 right-1 bg-slate-200 text-lg text-red-500 border border-gray-400 rounded-lg px-2 hover:bg-yellow-500 hover:cursor-pointer`}
          >
            X
          </p>
          <p
            className="hover:text-blue-500  hover:cursor-pointer"
            onClick={() => {
              setShowMenu((prev) => !prev);
              if (username) {
                navigate("/dash");
              } else {
                navigate("/");
              }
            }}
          >
            Home
          </p>
          {username && (
            <p
              onClick={() => {
                navigate("/dash/customer-profile");
                setShowMenu((prev) => !prev);
              }}
              className="hover:text-blue-500  hover:cursor-pointer"
            >
              My Profile
            </p>
          )}

          {username && (
            <p
              onClick={() => {
                navigate("/dash/wish_lists/user");
                setShowMenu((prev) => !prev);
              }}
              className="hover:text-blue-500  hover:cursor-pointer"
            >
              My WishList
            </p>
          )}

          {!username && (
            <p
              onClick={() => {
                navigate("/login");
                setShowMenu((prev) => !prev);
              }}
              className="hover:text-blue-500  hover:cursor-pointer"
            >
              Login
            </p>
          )}
          <p
            onClick={() => {
              navigate("/login");
              setShowMenu((prev) => !prev);
            }}
            className="hover:text-blue-500  hover:cursor-pointer"
          >
            Don't have account?{" "}
            <span className="text-sm font-bold">Sign-Up</span>
          </p>
          {username && (
            <div className="hover:text-blue-500  hover:cursor-pointer">
              <Logout />
            </div>
          )}
        </div>
      </div>
      {roles?.includes("Admin" || "Manager") && (
        <div className="min-h-[2rem] mt-[6rem] bg-blue-200 flex items-center p-3 ">
          <Link className="mr-2 bg-slate-100 px-2 rounded-sm" to="/dash/items">
            Items
          </Link>
          <Link
            className="mr-2 bg-slate-100 px-2 rounded-sm"
            to="/dash/items/new"
          >
            Add NewItem
          </Link>
          <Link className="mr-2 bg-slate-100 px-2 rounded-sm" to="/dash/users">
            Users
          </Link>
          <Link
            className="mr-2 bg-slate-100 px-2 rounded-sm"
            to="/dash/users/new"
          >
            Add NewUser
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
