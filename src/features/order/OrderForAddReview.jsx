import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrdersQuery } from "./orderApiSlice";
import RateForCustomer from "../../lib/RateForCustomer";
import { Link } from "react-router-dom";

const OrderForAddReview = () => {
  const { id } = useParams();

  const { order, refetch } = useGetOrdersQuery("listOrders", {
    selectFromResult: ({ data }) => ({
      order: data?.entities[id],
    }),
  });

  return (
    <div className="bg-slate-100 m-auto w-full max-w-lg p-2 mt-[3rem]">
      {order?.items?.map((item) => {
        return (
          <div
            key={item._id}
            className="flex flex-col justify-between bg-gray-200 border-2 border-gray-300 mb-1 rounded-md"
          >
            <div className="p-2">
              <Link
                className="text-2xl  hover:text-blue-500"
                to={`/dash/${item?.itemObjId}/item`}
              >
                {item?.itemName}
              </Link>
              <p className="mb-1">
                {item?.quantity} pcs @ $ {item?.price}{" "}
              </p>
            </div>

            <div className="flex flex-col p-2 min-w-[50%]">
              {!item?.isReviewed ? (
                <div>
                  <RateForCustomer
                    order={order}
                    orderItem={item}
                    orderRefetch={refetch}
                  />
                </div>
              ) : (
                <p className=" p-1 mb-3 bg-yellow-500 rounded-lg text-center">
                  Review already submitted
                </p>
              )}

              <Link
                to={`/dash/${item?.itemObjId}/item`}
                className=" p-1 text-center bg-blue-500 text-white rounded-lg  hover:text-black  hover:bg-green-400"
              >
                Get product support
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderForAddReview;
