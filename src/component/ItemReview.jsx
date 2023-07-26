import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetItemsQuery } from "../features/items/itemApiSlice";
import { useGetUsersQuery } from "../features/users/userApiSlice";
import { FaRegUser } from "react-icons/fa";
import { Rate } from "antd";
import { addProductToCart } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";

const ItemReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = useAuth();

  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[id],
    }),
  });

  useTitle(item?.itemName);
  //console.log(item?.review);
  const { users } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data }) => ({
      users: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  // handle add product in the cart

  const handleAddToCart = (product) => {
    try {
      dispatch(addProductToCart(product));
    } catch (error) {
      console.log(error);
    }
  };
  const now = Date.now();

  const sortedReviews = item?.review
    ?.map((review) => review)
    ?.sort((a, b) => b?.dateNow - a?.dateNow);

  const content = (
    <div className="p-2 bg-gray-100 min-h-screen m-auto w-full max-w-lg mt-[3rem]">
      <div className="p-2 sm:flex sm:flex-row bg-gray-200  ">
        <div className="sm:mr-2 sm:w-[50%] p-1 bg-sky-300 sm:rounded-md flex justify-center">
          <img className="h-[10rem] w-auto p-2" src={item?.images[0]} alt="" />
        </div>
        <div className="sm:w-[50%] sm:px-4 p-3 bg-sky-300 sm:rounded-md flex flex-col ">
          <p className="text-2xl italic min-w-full text-center ">
            {item?.itemName}
          </p>
          <p className="text-sm font-semibold text-center">
            Available Stock -{item?.quantity} pcs
          </p>
          <p className="text-sm font-bold text-center">Price {item?.price}</p>
          <button
            onClick={() => {
              handleAddToCart(item);
              if (userId) {
                navigate("/dash/carts");
              } else {
                navigate("/carts");
              }
            }}
            className="bg-pink-400 p-1 px-3 rounded-lg hover:bg-yellow-500 my-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
      {item?.review?.length > 0 ? (
        <div className="p-2 bg-gray-200 ">
          {sortedReviews?.map((review, index) => {
            const user = users?.find((user) => user?.id === review?.userObjId);

            const displaySecond = ((now - review?.dateNow) / 1000).toFixed(0);
            const minute = Math.floor(displaySecond / 60);
            const hour = Math.floor(minute / 60);
            const day = Math.floor(hour / 24);
            const month = Math.floor(day / 30);
            const year = Math.floor(month / 12);

            const timeDisplay =
              displaySecond <= 60
                ? `${displaySecond} seconds ago`
                : minute <= 60
                ? `${minute} min ago`
                : hour <= 24
                ? `${hour} hours ago`
                : day <= 30
                ? `${day} days ago`
                : month <= 12
                ? `${month} months ago`
                : `${year} years ago`;

            return (
              <div
                key={index}
                className="border border-green-500 p-2 mb-3 bg-white rounded-md "
              >
                <div className="flex flex-row items-center p-1">
                  <FaRegUser className="text-3xl bg-slate-300 p-1 rounded-full" />
                  <p className="text-sm font-bold ml-1">{user?.username}</p>
                </div>
                <div>
                  <Rate
                    defaultValue={review?.score}
                    allowHalf
                    disabled
                    className="text-sm"
                  />
                </div>

                <p className="p-1">{review?.text}</p>
                {review?.dateNow && (
                  <p className="p-1 text-sm text-blue-900">{timeDisplay}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-2xl text-center mt-3">No reviews yet</div>
      )}
    </div>
  );

  return content;
};

export default ItemReview;
