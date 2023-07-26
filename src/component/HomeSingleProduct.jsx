import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetItemsQuery } from "../features/items/itemApiSlice";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../features/cart/cartSlice";
import RateToDisplay from "../lib/RateToDisplay";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useAddWishListMutation } from "../features/wishList/wishListApiSlice";
import useTitle from "../hooks/useTitle";

const HomeSingleProduct = () => {
  const { userId, username } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[id],
    }),
  });

  useTitle(item?.itemName);

  const handleToAddProductToCart = (product) => {
    try {
      dispatch(addProductToCart(product));
    } catch (error) {
      console.log(error);
    }
  };

  const [imageIndex, setImageIndex] = useState(0);

  const image = item?.images?.map((image, index) => {
    return (
      <div key={index} className="border border-blue-500 rounded-md m-1">
        <img
          alt=""
          onClick={() => setImageIndex(index)}
          // height={40}
          // width={40}
          src={image}
          className="p-2 h-[48px] w-[48px] cursor-pointer hover:border border-blue-500 rounded-md "
        />
      </div>
    );
  });

  const [addToWishListMutation, { isSuccess }] = useAddWishListMutation();

  const handleAddToWishList = async (item) => {
    try {
      await addToWishListMutation({
        itemObjId: item?.id,
        userObjId: userId,
        itemName: item?.itemName,
        image: item?.images[0],
      });
      toast.success("Item added to WishList", { position: "top-center" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="bg-gray-200 min-h-[100vh] flex flex-row justify-center">
    <div className="m-auto w-full max-w-lg p-1 bg-gray-50 mt-[3rem]">
      <div className="rounded-md bg-sky-500">
        <div className="border border-gray-300 p-1 ">
          <div className="sm:flex sm:flex-row">
            <div className="sm:w-[40%] flex justify-center  bg-gray-100 p-1 pt-2 px-2 border-2 border-gray-300">
              <img
                width={200}
                height={200}
                src={item?.images[imageIndex]}
                alt=""
                className="min-h-[200px] max-h-[200px] w-auto "
              />
            </div>
            <div className="sm:w-[60%] bg-gray-100 p-1 pt-2 px-2 border-2 border-gray-300">
              <div className="flex flex-row ">
                <p className="text-2xl mr-1">$</p>
                <p className=" text-3xl">{parseInt(item?.price) || ""}</p>
                <p>99</p>
              </div>
              <p className="text-2xl">{item?.itemName}</p>
              <p className="font-semibold">
                Available Stock : {item?.quantity}
              </p>
              <p className="font-light">free shipment eligible </p>
              <div className="w-full ">
                <button
                  onClick={() => {
                    if (userId) {
                      navigate(`/dash/${item?.id}/reviews`);
                    } else {
                      navigate(`/${item?.id}/reviews`);
                    }
                  }}
                >
                  <RateToDisplay itemId={id} />
                </button>
              </div>
              <div className="flex items-center justify-around py-2 ">
                <button
                  onClick={() => {
                    handleToAddProductToCart(item);
                    if (userId) {
                      navigate("/dash/carts");
                    } else {
                      navigate("/carts");
                    }
                  }}
                  className="bg-pink-400 p-1 px-2 border-2 border-gray-300 text-sm rounded-lg mt-2 hover:bg-green-400 hover:text-white"
                >
                  Add to Cart
                </button>
                {username && (
                  <button
                    onClick={() => handleAddToWishList(item)}
                    className="bg-pink-400 p-1 px-2 border-2 border-gray-300 text-sm rounded-lg mt-2 hover:bg-green-400 hover:text-white"
                  >
                    Save for Later``
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-start items-center bg-gray-100 px-2">
            {image}
          </div>
        </div>
        <div className="border border-gray-300 p-1">
          <p className="text-sm font-semibold mb-2">Item Descriptions:</p>
          {item?.itemDescription?.split(".").map((p, i) => {
            return (
              <div
                key={i}
                className="mb-1 p-1 text-sm flex flex-row  border bg-gray-100 rounded-md"
              >
                <div className="mr-2 text-sm font-bold">{i + 1}.</div>
                <div className="text-sm">{p}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default HomeSingleProduct;
