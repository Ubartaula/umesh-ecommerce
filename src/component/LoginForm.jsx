import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setLoginCredentials } from "../features/auth/authSlice";
import { ImWarning } from "react-icons/im";
import {
  useAddUserMutation,
  usePatchUserMutation,
} from "../features/users/userApiSlice";
import Loading from "../lib/Loading";
import { currentCartState } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector(currentCartState);
  const lengthOfCart = cartState.cartItems.length;

  const [loginMutation, { isSuccess, isLoading }] = useLoginMutation();
  const [addUser, { isSuccess: isSuccessAddUser }] = useAddUserMutation();
  const [errMsg, setErrMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState("sign-in");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const matchPassword = password === confirmPassword;

  const handleLogin = async () => {
    try {
      const { accessToken } = await loginMutation({
        username,
        password,
      }).unwrap();
      dispatch(setLoginCredentials({ accessToken }));
    } catch (error) {
      if (error?.status === 400) {
        setErrMsg("both fields require");
      } else if (error?.status === 401) {
        setErrMsg("unauthorized, username or password did not match");
      } else {
        setErrMsg(error?.data?.message);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (lengthOfCart > 0) {
        navigate("/dash/carts");
      } else {
        navigate("/dash");
      }
    }
  }, [isSuccess, lengthOfCart, navigate]);

  const handleSignUp = async () => {
    try {
      await addUser({ username, password, email, longitude, latitude });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    if (confirmPassword) {
      matchPassword
        ? setErrMsg("")
        : setErrMsg("confirm password did not match");
    }
  }, [password, matchPassword, confirmPassword]);

  useEffect(() => {
    if (isSuccessAddUser) {
      handleLogin();
    }
  }, [isSuccessAddUser]);

  const loginButtonCss =
    username && password ? "bg-pink-400 hover:cursor-pointer" : "bg-slate-300";
  const loginButtonDisable = username && password ? false : true;
  const typePassword = showPassword ? "text" : "password";

  //handle reset password
  const [
    patchUserMutation,
    { isSuccess: isPatchSuccess, isError, error: backError },
  ] = usePatchUserMutation();

  const handleGenerateOtp = async () => {
    try {
      await patchUserMutation({
        email: email,
        otp: Math.floor(Math.random() * 100000),
        otpExpire: Date.now() + 1000 * 60 * 5,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isPatchSuccess) {
      toast("OTP password has been sent to an email ", {
        position: "top-center",
      });
      navigate("/reset");
    }
  }, [isPatchSuccess, navigate]);

  // handle location
  const [term, setTerm] = useState(false);
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.log("Geolocation not supported on your browser");
    }
  };

  const termAcceptance = (
    <div className="flex flex-col">
      {navigator.geolocation && (
        <div className="flex flex-row items-center">
          <input type="checkbox" onClick={handleGetLocation} />
          <label className="text-sm ml-1" htmlFor="">
            Accept Terms & Conditions
          </label>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-1 mt-[3rem]">
      {isLoading && <Loading />}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="m-auto bg-slate-200  w-full max-w-lg rounded-md"
      >
        {errMsg && (
          <div
            aria-live="assertive"
            className="bg-gray-100 border-2 border-gray-500 border-spacing-4 box-border rounded-md p-4 flex flex-row items-center"
          >
            <ImWarning className="text-yellow-600 font-bold text-6xl mr-3" />
            <p className=" capitalize text-red-500"> {errMsg}</p>
          </div>
        )}
        {login === "sign-in" ? (
          <div className="min-h-[60vh] border border-gray-300 p-2 text-sm">
            <p className="text-xl font-semibold mb-1 p-1">Sign In</p>
            <div className="p-1">
              <div className=" flex flex-col p-1 ">
                <label className="mb-1 font-semibold" htmlFor="">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-blue-500 rounded-md text-sm p-1 px-1"
                />
              </div>
              <div className=" flex flex-col p-1">
                <label className="mb-1 font-semibold" htmlFor="">
                  Password
                </label>
                <input
                  type={typePassword}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-blue-500 rounded-md text-sm p-1 px-1"
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-evenly text-blue-500 font-semibold mb-3">
              <div className="flex flex-row items-center mr-2">
                <input
                  className="text-xl"
                  type="checkbox"
                  name=""
                  id=""
                  value={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label htmlFor="" className="ml-0.5">
                  Show Password
                </label>
              </div>
              <div
                className="hover:cursor-pointer hover:underline underline-offset-2 text-blue-900"
                onClick={() => setLogin("forgot")}
              >
                Forgot password?
              </div>
            </div>

            <div className="flex items-center justify-center my-6">
              <p className="text-sm ml-2">Don't have account ?</p>
              <span
                onClick={() => setLogin("sign-up")}
                className="text-lg text-blue-500 ml-1 hover:cursor-pointer hover:underline"
              >
                Sign-Up
              </span>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleLogin}
                disabled={loginButtonDisable}
                className={`${loginButtonCss}  border border-blue-400 px-6 rounded-md text-sm p-1`}
              >
                Sign In
              </button>
            </div>
          </div>
        ) : login === "sign-up" ? (
          <div className="min-h-[60vh] border border-gray-300 p-2 text-sm">
            <p className="text-xl font-semibold mb-1 p-1">Create account</p>
            <div className="p-1">
              <div className="flex flex-col p-1">
                <label className="mb-1 font-semibold" htmlFor="">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-blue-500 rounded-md text-sm p-1 px-1 mb-1"
                />
              </div>
              <div className="flex flex-col p-1">
                <label className="mb-1 font-semibold" htmlFor="">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-blue-500 rounded-md text-sm p-1 px-1 mb-1"
                />
              </div>
              <div className="flex flex-col p-1">
                <label className="mb-1 font-semibold" htmlFor="">
                  Password
                </label>
                <input
                  type={typePassword}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-blue-500 rounded-md text-sm p-1 px-1 mb-1"
                />
              </div>
              <div className="flex flex-col p-1">
                <label className="mb-1 font-semibold" htmlFor="">
                  Re-enter password
                </label>
                <input
                  type={typePassword}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-blue-500 rounded-md text-sm p-1 px-1"
                />
              </div>
            </div>
            <div className="text-xs flex justify-center font-semibold mb-3">
              <input
                type="checkbox"
                name=""
                id=""
                value={showPassword}
                onChange={() => setShowPassword((prev) => !prev)}
              />
              <label htmlFor="" className="text-xs ml-1">
                Show Password
              </label>
            </div>

            <div className="flex justify-center mb-4">
              <p className="text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setLogin("sign-in")}
                  className="text-blue-500 text-lg hover:text-semibold hover:cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </p>
            </div>
            <div
              onClick={() => setTerm((prev) => !prev)}
              className="text-blue-600 text-sm px-2 mb-3"
            >
              {termAcceptance}
            </div>
            <div className="flex justify-center mb-3">
              <button
                onClick={handleSignUp}
                disabled={
                  !(
                    username &&
                    email &&
                    password &&
                    confirmPassword &&
                    matchPassword &&
                    term &&
                    longitude &&
                    latitude
                  )
                }
                className={`
                ${
                  username &&
                  email &&
                  password &&
                  confirmPassword &&
                  matchPassword &&
                  term &&
                  longitude &&
                  latitude
                    ? "bg-pink-500 hover:bg-green-400"
                    : "bg-slate-200"
                } border border-blue-400 px-6 rounded-md text-sm p-1`}
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[60vh] border border-gray-300 p-2">
            {isError && (
              <div className="min-h-[1.5rem] text-red-500 capitalize">
                {backError?.data?.message}
              </div>
            )}
            <h2 className="text-center p-2">Let's get you into your account</h2>
            <h3 className="font-semibold text-sm px-4 py-2">
              Tell us your sing-in email to get started
            </h3>

            <div className="flex flex-col px-4">
              <input
                placeholder="provide email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-2 border border-blue-500 rounded-md text-sm p-1 mb-1"
              />
            </div>
            <div className="px-4 py-2">
              <button
                disabled={!email}
                onClick={handleGenerateOtp}
                className={`${
                  email ? "bg-pink-400 hover:bg-green-400" : "bg-gray-400 "
                }  p-1 rounded-md w-full border-2 border-gray-300 `}
              >
                Submit
              </button>
            </div>
            <p
              className="text-blue-500 text-sm p-2 mt-3 hover:cursor-pointer hover:underline underline-offset-4"
              onClick={() => setLogin("sign-in")}
            >
              Go back to Login ?
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
