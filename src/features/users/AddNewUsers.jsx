import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAddUserMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/ROLES";
import { Select } from "antd";
import useDebounce from "../../hooks/useDebounce";

const AddNewUsers = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roles, setRoles] = useState([]);
  console.log(roles);

  const displayButton = password !== confirmPassword ? true : false;
  const cssButton = displayButton
    ? "bg-slate-300"
    : "bg-pink-400 hover:bg-green-500 hover:text-white";

  const [addUser, { isSuccess }] = useAddUserMutation();
  const handleAddNewUser = async () => {
    try {
      await addUser({ username, email, password, roles });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/users");
    }
  }, [isSuccess, navigate]);

  const roleOption = Object.values(ROLES).map((role) => {
    return <Select.Option key={role} value={role} label={role} />;
  });

  const handleSelectRole = (select) => {
    setRoles(select);
  };

  const value = (e) => {
    const t = e?.target?.value;
    return t;
  };

  const onChangeEmail = (e) => {
    setEmail(e?.target?.value);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="m-auto w-full max-w-md  bg-slate-200 p-5"
    >
      <div className="bg-slate-200 p-1 flex justify-around ">
        <div className="flex flex-col p-1">
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
            Repeat Password
          </label>
          <label className="m-1" htmlFor="">
            Roles
          </label>
        </div>
        <div className="flex flex-col p-1">
          <input
            required
            className="border border-blue-400 m-1 px-1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            className="border border-blue-400 m-1 px-1"
            type="email"
            value={email}
            onChange={onChangeEmail}
          />
          <input
            required
            className="border border-blue-400 m-1 px-1"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            required
            className="border border-blue-400 m-1 px-1"
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Select
            placeholder="select roles"
            mode="multiple"
            value={roles}
            onChange={handleSelectRole}
          >
            {roleOption}
          </Select>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          disabled={displayButton}
          className={`w-full p-1 my-2 rounded-md ${cssButton}`}
          onClick={handleAddNewUser}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNewUsers;
