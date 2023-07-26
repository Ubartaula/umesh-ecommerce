import React, { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { setLoginCredentials } from "./authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMutation, { isSuccess }] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/customer-profile");
    }
  }, [isSuccess, navigate]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="m-auto w-full max-w-md"
    >
      <div aria-live="assertive" className="text-red-500 min-h-[5rem]">
        {errMsg}
      </div>
      <div className="flex flex-row">
        <div className="p-2 flex flex-col justify-center">
          <label className="m-2" htmlFor="">
            Username
          </label>

          <label className="m-2" htmlFor="">
            Password
          </label>
        </div>
        <div className="p-2 flex flex-col">
          <input
            required
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-1 border border-blue-500 rounded-lg m-2"
          />

          <input
            required
            minLength={4}
            maxLength={6}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-1 border border-blue-500 rounded-lg m-2"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleLogin}
          className="p-1 px-4 bg-pink-500 rounded-lg  m-3"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
