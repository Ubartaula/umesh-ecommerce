import React, { useState } from "react";
import { useGetItemsQuery } from "./itemApiSlice";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../cart/cartSlice";
import { Link } from "react-router-dom";
import RateToDisplay from "../../lib/RateToDisplay";

const Item = ({ itemId }) => {
  const dispatch = useDispatch();

  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[itemId],
    }),
  });

  const handleAdd = (product) => {
    try {
      dispatch(addProductToCart(product));
    } catch (error) {
      console.log(error);
    }
  };

  const [imageIndex, setImageIndex] = useState(0);

  const url = "http://localhost:3300/";

  const image = item?.images?.map((image, index) => {
    return (
      <div key={index} className="flex ">
        <img
          onClick={() => setImageIndex(index)}
          height={48}
          width={48}
          src={image}
          className="m-1 cursor-pointer hover:border border-blue-500 rounded-md max-h-[48px] min-h-[48px]"
        />
      </div>
    );
  });

  const displayProduct = (
    <div className="p-2 m-auto w-full max-w-lg bg-slate-500 ">
      <div className="p-1 mb-1 border-2 border-gray-400 rounded-lg bg-gray-100">
        <div className="">
          <div className=" flex flex-col sm:flex-row items-center justify-center">
            <div className="">
              <img
                src={item?.images[imageIndex]}
                alt=""
                className="h-[200px] w-[200px] sm:mr-2"
              />
            </div>
            <div className="">
              <p className="w-full text-2xl">{item?.itemName}</p>
              <p className="w-full">Price - ${item?.price}</p>
              <p className="w-full">
                Available Stock - {item?.quantity}
                {item?.sku}
              </p>
              <div className="h-auto w-full flex">{image}</div>
            </div>
          </div>
          <div className="p-2">
            <RateToDisplay itemId={item?.id} />
          </div>
        </div>
        <div className="p-2 ">
          <button
            onClick={() => handleAdd(item)}
            className="bg-green-300 p-1 w-full rounded-md hover:bg-green-500"
          >
            Add To Cart
          </button>
        </div>
        <div className="p-2 flex justify-center text-center">
          <Link
            to={`/dash/items/${item?.id}`}
            className="bg-pink-300 p-1 w-full rounded-md hover:bg-green-300"
          >
            Edit Item
          </Link>
        </div>
      </div>
    </div>
  );

  return displayProduct;
};

export default React.memo(Item);
