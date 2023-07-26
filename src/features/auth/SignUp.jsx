import React, { useEffect, useState } from "react";
import { useAddUserMutation } from "../users/userApiSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [addUser, { isSuccess }] = useAddUserMutation();

  const [username, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const cssShowPassword = showPassword ? "text" : "password";
  const matchPassword = password === confirmPassword;
  const checkField =
    username && email && password && confirmPassword && matchPassword
      ? ""
      : "disable";
  const disableCss = checkField
    ? "bg-slate-200"
    : "bg-pink-400 hover:bg-green-400 hover:text-white ";

  const handleSignUp = async () => {
    try {
      await addUser({ username, password, email });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (confirmPassword) {
      matchPassword
        ? setErrMsg("")
        : setErrMsg("confirm password did not match");
    }
  }, [password, confirmPassword]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="m-auto w-full max-w-lg bg-slate-300 p-7"
    >
      <div
        aria-live="assertive"
        className="min-h-[2rem] text-red-500 capitalize text-lg"
      >
        {errMsg}
      </div>
      <div className="flex flex-row min-w-fit items-center">
        <div className="p-1 flex flex-col ">
          <label className="m-1" htmlFor="">
            Username
          </label>
          <label className="m-1" htmlFor="">
            Email
          </label>
          <label className="m-1" htmlFor="">
            Password
          </label>
          <label className="m-1" htmlFor="">
            Confirm Password
          </label>
        </div>
        <div className="p-1 flex flex-col">
          <input
            className="m-1 border border-blue-500 px-1"
            required
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="m-1 border border-blue-500 px-1"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="m-1 border border-blue-500 px-1"
            required
            maxLength={6}
            minLength={4}
            type={cssShowPassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="m-1 border border-blue-500 px-1"
            required
            maxLength={6}
            minLength={4}
            type={cssShowPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <input
          type="checkbox"
          name=""
          id=""
          value={showPassword}
          onChange={() => setShowPassword((prev) => !prev)}
        />
        <label htmlFor="" className="text-xs ml-1 capitalize">
          show password
        </label>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSignUp}
          disabled={checkField}
          className={`${disableCss} p-1 m-2 px-4 rounded-lg border border-gray-200 `}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignUp;
