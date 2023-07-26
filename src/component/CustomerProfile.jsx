import React, { useState } from "react";
import { useGetOrdersQuery } from "../features/order/orderApiSlice";
import useAuth from "../hooks/useAuth";
import CustomerNavBar from "./CustomerNavBar";
import { Link, useNavigate } from "react-router-dom";
import { TfiReload } from "react-icons/tfi";
import { addProductToCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CustomerProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, username } = useAuth();
  const [showReviewDiv, setShowReviewDiv] = useState(false);

  const { orders } = useGetOrdersQuery("listOrders", {
    selectFromResult: ({ data }) => ({
      orders: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  const handleAddToCart = (product) => {
    try {
      dispatch(addProductToCart(product));
    } catch (error) {
      console.log(error);
    }
  };

  const filterOrders = orders?.filter((order) => order.userObjId === userId);

  const convertUTZToLocalDate = (UTZdate) => {
    const localDate = new Date(UTZdate);
    const newDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60 * 1000
    );

    return newDate;
  };

  const convertUTCtimeToLocal = (utcDateString) => {
    const lt = new Date();
    const utcTime = new Date(utcDateString).getTime();
    const timeOffSet =
      new Date(utcDateString).getTimezoneOffset() + 1 * 60 * 1000;
    // plus 1 is to add one month since month is began from 0
    // *60*1000 is to convert min to seconds to compare with utcTime
    const localDateFormat = new Date(utcTime - timeOffSet);
    return localDateFormat;
  };

  return (
    <div className="mt-[3rem]">
      <div className="bg-gray-100 min-h-[100vh]">
        <div>
          <CustomerNavBar />
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="min-w-fit flex flex-col p-2 bg-slate-200 sm:mr-2">
            <button className="border-2 bg-yellow-500 rounded-md min-w-full p-1 hover:border-blue-500">
              Payment Info
            </button>
            <button className="border-2 bg-yellow-500 rounded-md min-w-full p-1 hover:border-blue-500">
              Orders Summery{" "}
            </button>
            <button className="border-2 bg-yellow-500 rounded-md min-w-full p-1 hover:border-blue-500">
              Setting
            </button>
          </div>
          <div className="w-full bg-slate-200 p-2">
            <h2 className="text-lg text-center pb-2">Your purchase history</h2>

            {filterOrders?.length ? (
              <div>
                {filterOrders?.map((order) => {
                  const localDate = convertUTCtimeToLocal(order?.createdAt);
                  const hour = localDate.getHours();
                  const hourFormatted =
                    hour === 0
                      ? 0
                      : hour === 13
                      ? 1
                      : hour === 14
                      ? 2
                      : hour === 15
                      ? 3
                      : hour === 16
                      ? 4
                      : hour === 17
                      ? 5
                      : hour === 18
                      ? 6
                      : hour === 19
                      ? 7
                      : hour === 20
                      ? 8
                      : hour === 21
                      ? 9
                      : hour === 22
                      ? 10
                      : hour === 23
                      ? 11
                      : hour;

                  const amPm = hour >= 12 ? "PM" : "AM";

                  const timeStamp = `${localDate.getFullYear()}/${
                    localDate.getMonth() + 1
                  }/${localDate.getDate()}  ${hourFormatted}:${localDate.getMinutes()} ${amPm}`;

                  const amount = order?.items?.reduce((prev, curr) => {
                    const qty = curr?.quantity;
                    const price = curr?.price;
                    return prev + qty * price;
                  }, 0);
                  return (
                    <div
                      key={order?._id}
                      className="bg-gray-100  rounded-lg p-2 mb-2 m-1 border border-green-500"
                    >
                      <div className="">
                        <div className="bg-slate-300 p-2 flex flex-row items-top ">
                          <div className="mr-4">
                            <p className="text-sm font-semibold">
                              ORDER PLACED
                            </p>
                            <span className="text-sm font-semibold text-blue-900">
                              {timeStamp}
                            </span>
                          </div>
                          <div className="mr-4">
                            <p className="text-sm font-semibold">TOTAL</p>
                            <p className="text-sm font-semibold text-blue-900">
                              {amount || 0}
                            </p>
                          </div>
                          <div className="mr-4">
                            <p className="text-sm font-semibold">
                              ORDER NUMBER
                            </p>
                            <p className="text-sm font-semibold text-center text-blue-900">
                              {order?.orderNumber}
                            </p>
                          </div>
                        </div>
                        {order?.items?.map((orderItem) => {
                          const id = orderItem?._id;
                          const itemWithId = { ...orderItem, id };

                          return (
                            <div
                              key={orderItem?._id}
                              className="flex sm:flex-row flex-col justify-between border-2 border-gray-300 mb-1"
                            >
                              <div className="p-2">
                                <Link
                                  className="text-2xl hover:text-blue-500"
                                  to={`/dash/${orderItem?.itemObjId}/item`}
                                >
                                  {orderItem?.itemName}
                                </Link>
                                <p>Ordered Qty- {orderItem?.quantity} Pcs</p>
                                <div
                                  onClick={() => {
                                    handleAddToCart(itemWithId);
                                    navigate("/dash/carts");
                                  }}
                                  className="flex flex-row items-center p-1 px-2 bg-rose-600 text-white rounded-md w-fit hover:bg-green-500  hover:text-black  hover:cursor-pointer  "
                                >
                                  <TfiReload className="mr-2" />
                                  <div>Buy it again</div>
                                </div>
                              </div>

                              <div className="flex flex-col mt-2 p-1 sm:max-w-[40%] sm:min-w-[40%]">
                                {!orderItem?.isReviewed ? (
                                  <Link
                                    to={`/dash/orders/${order?.id}`}
                                    className=" text-center p-1 bg-blue-500 text-white rounded-lg hover:text-black hover:bg-green-500  mb-1"
                                  >
                                    Write a product review
                                  </Link>
                                ) : (
                                  <p className="text-center p-1 bg-yellow-600 text-white rounded-lg  mb-1">
                                    Review submitted
                                  </p>
                                )}

                                <Link
                                  to={`/dash/${orderItem?.itemObjId}/item`}
                                  className="p-1 text-center bg-blue-500 text-white rounded-lg hover:text-black hover:bg-green-500 "
                                >
                                  Get product support
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xl text-center pt-4 animate-pulse">
                You do not have any purchase history
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
