import React, { useEffect, useState } from "react";
import {
  useEditUserMutation,
  useGetUsersQuery,
} from "../features/users/userApiSlice";
import { useVerifyOptMutation } from "../features/reset/verifyOtpApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useTitle from "../hooks/useTitle";

const ResetPassword = () => {
  useTitle("Reset Password");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchPwError, setMatchPwError] = useState("");
  const [otpErr, setOtpErr] = useState("");

  // handle otp verification
  const [
    verifyOptMutation,
    { isSuccess: isVerifySuccess, isError: isOtpVerificationError, error },
  ] = useVerifyOptMutation();

  const handleVerificationOtp = async () => {
    try {
      await verifyOptMutation({
        otp: Number(otp),
        otpExpire: Date.now(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isVerifySuccess) {
      toast.success("OTP verification success", { position: "top-center" });
    }
  }, [isVerifySuccess]);

  useEffect(() => {
    if (isOtpVerificationError) {
      setOtpErr(error?.data?.message);
    }
    if (!otp) {
      setOtpErr("");
    }
  }, [isOtpVerificationError, otp]);

  // handle edit password
  const [editUserMutation, { isSuccess, isError, error: editPasswordErr }] =
    useEditUserMutation();
  const { users } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data }) => ({
      users: data?.ids?.map((id) => data?.entities[id]),
    }),
  });
  const findUser = users?.find((user) => user?.otp === Number(otp));

  const handleEditPassword = async () => {
    try {
      await editUserMutation({
        id: findUser?.id,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password reset success", { position: "top-center" });
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const match = password === confirmPassword;
  const disableButton = !(password && confirmPassword && match);
  const cssButton =
    password && confirmPassword && password === confirmPassword
      ? "hover:bg-green-400 bg-pink-400 "
      : "disable";

  const cssOtpButton = otp ? "hover:bg-green-400 bg-pink-400 " : "disable";

  useEffect(() => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setMatchPwError("Repeat password did not match");
      } else {
        setMatchPwError("");
      }
    }
  }, [password, confirmPassword]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-[3rem] m-auto w-full max-w-lg min-h-[60vh] border border-gray-300 p-4 bg-slate-200"
    >
      {!isVerifySuccess ? (
        <div className="">
          {otpErr && (
            <div className="p-1 px-3 min-h-[1.5rem] capitalize text-red-500 bg-yellow-500  rounded-md">
              {otpErr}
            </div>
          )}
          <div className="p-4 ">
            {/* <p className="mb-4 bg-black p-1 px-3 rounded-sm text-white ">
              OTP code has been sent to your email, please check email
            </p> */}

            <input
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              placeholder="put reset code here..."
              className="w-full p-1 px-2 border border-blue-500 rounded-md"
            />
            <div className="text-center">
              <button
                disabled={!otp}
                onClick={handleVerificationOtp}
                className={`${
                  otp ? "bg-pink-400 hover:bg-green-400" : "bg-gray-400"
                } border-2 border-gray-300 p-1 w-full rounded-md mt-4`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {isError && (
            <div className="text-red-500 bg-yellow-500 p-1 px-3 rounded-md">
              {editPasswordErr?.data?.message}
            </div>
          )}
          <div aria-live="assertive" className="min-h-[2rem] text-red-500 px-3">
            {matchPwError}
          </div>
          <p className="font-bold mb-2">Enter Password</p>
          <label htmlFor="">New Password</label>
          <input
            placeholder="minimum 4 character..."
            required
            minLength={4}
            maxLength={10}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-1 px-2 border border-blue-500 rounded-md"
          />
          <label htmlFor="">Repeat Password</label>
          <input
            required
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-1 px-2 border border-blue-500 rounded-md"
          />
          <div className="text-center">
            <button
              disabled={disableButton}
              // disabled={password && confirmPassword}
              onClick={handleEditPassword}
              className={`${cssButton}  border-2 border-gray-300 min-w-[7rem] p-1 rounded-md mt-4`}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ResetPassword;
