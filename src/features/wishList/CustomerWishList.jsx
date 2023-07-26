import React, { useEffect, useState } from "react";
import {
  useDeleteWishListMutation,
  useGetWishListsQuery,
} from "./wishListApiSlice";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import RateToDisplay from "../../lib/RateToDisplay";

const CustomerWishList = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const { wishLists } = useGetWishListsQuery("listWishLists", {
    selectFromResult: ({ data }) => ({
      wishLists: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  const userWishList = wishLists?.filter((wl) => wl?.userObjId === userId);

  //handle remove
  const [deleteItemMutation, { isSuccess }] = useDeleteWishListMutation();
  const handleRemoveItem = async (id) => {
    try {
      await deleteItemMutation({ id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto w-full max-w-lg p-1 mt-[3rem]">
      {userWishList?.length > 0 ? (
        <div className="">
          {userWishList?.map((wishList) => {
            return (
              <div
                key={wishList?.id}
                className="flex flex-col items-center justify-center border border-slate-500 mb-2 rounded-md p-2 bg-gray-50  "
              >
                <div className="w-fit">
                  <img
                    src={wishList?.image}
                    alt=""
                    className="w-[80px] h-[80px] mr-2 "
                  />

                  <Link
                    to={`/dash/${wishList?.itemObjId}/item`}
                    className="text-xl  hover:text-blue-600"
                  >
                    {wishList?.itemName}{" "}
                    <span className="text-blue-500 text-xs font-bold">
                      View Product
                    </span>
                  </Link>
                  <div className="mt-2 bg-white rounded-lg ">
                    <RateToDisplay itemId={wishList?.itemObjId} />
                  </div>
                  <div className="flex my-3">
                    <button
                      onClick={() => handleRemoveItem(wishList?.id)}
                      className="bg-pink-300 p-1 px-2 rounded-lg hover:bg-green-500 hover:text-white w-full"
                    >
                      Remove Item
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Link
          to="/dash"
          className="flex flex-row items-center justify-center hover:text-blue-600 hover:text-2xl text-xl m-2 text-black"
        >
          Your WishList is Empty, Continue shopping ?
        </Link>
      )}
    </div>
  );
};

export default CustomerWishList;
