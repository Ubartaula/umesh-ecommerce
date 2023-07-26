import React from "react";
import { useDispatch } from "react-redux";
import {
  addProductToCart,
  decreaseCartQuantity,
  removeProductFromCart,
} from "./cartSlice";
import {
  useAddWishListMutation,
  useDeleteWishListMutation,
} from "../wishList/wishListApiSlice";
import useAuth from "../../hooks/useAuth";
import { FiDelete } from "react-icons/fi";

const Cart = ({ item }) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();

  const handleAddQuantity = (product) => {
    try {
      dispatch(addProductToCart(product));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecreaseQuantity = (product) => {
    try {
      dispatch(decreaseCartQuantity(product));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = (product) => {
    try {
      dispatch(removeProductFromCart(product));
    } catch (error) {
      console.log(error);
    }
  };

  // add wish list

  const [addToWishListMutation, { isSuccess }] = useAddWishListMutation();
  const handleAddToWishList = async (item) => {
    try {
      await addToWishListMutation({
        itemObjId: item?.id,
        userObjId: userId,
        itemName: item?.itemName,
        image: item?.images[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:flex p-2 mb-2 border-2 relative">
      {/* <img
        height={100}
        width={100}
        src={item?.images[0]}
        alt="image"
        className="sm:w-[100px] w-[150px] "
      /> */}
      <div className="sm:ml-2">
        <p className="font-semibold">{item.itemName}</p>
        <p className="">in stock</p>
        <div className="flex flex-row ">
          <div className="flex flex-row items-center bg-slate-200 border border-slate-300 p-1 rounded-xl mr-1 text-sm">
            <p className="mr-2 bg-black text-white p-1 px-2 rounded-full ">
              {item?.cartQuantity}
            </p>
            <button
              onClick={() => handleAddQuantity(item)}
              className="bg-pink-400 border-2 border-gray-300 p-1  px-2 h-fit rounded-full mr-1 hover:bg-green-500 hover:text-white"
            >
              +
            </button>
            <button
              onClick={() => handleDecreaseQuantity(item)}
              className="bg-pink-400 border-2 border-gray-300 p-1 px-2 h-fit rounded-full mr-1 hover:bg-green-500 hover:text-white"
            >
              -
            </button>
          </div>
          <div className="flex flex-col sm:flex-row w-full">
            <button
              onClick={() => handleRemoveItem(item)}
              className="bg-pink-300 border-2 border-gray-300 p-1  text-sm  rounded-lg sm:mr-1 font-light hover:bg-green-500 hover:text-white "
            >
              Delete
            </button>
            {userId && (
              <button
                onClick={() => {
                  handleAddToWishList(item);
                  handleRemoveItem(item);
                }}
                className="bg-pink-300 border-2 border-gray-300 text-sm p-1   rounded-lg  font-light hover:bg-green-500 hover:text-white"
              >
                Save for Later
              </button>
            )}
          </div>
        </div>
      </div>

      <p className=" absolute right-2 top-2 font-semibold">
        $ {Number(item.price).toFixed(2)}
      </p>
    </div>
  );
};

export default React.memo(Cart);
