import React, { useEffect } from "react";
import Cart from "./Cart";
import { useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useAddOrderMutation, useGetOrdersQuery } from "../order/orderApiSlice";
import useAuth from "../../hooks/useAuth";
import { useGetUsersQuery } from "../users/userApiSlice";
import CustomerNavBar from "../../component/CustomerNavBar";
import { Result } from "antd";
import useCart from "../../hooks/useCart";

const ListCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useAuth();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useCart();

  // handle place order
  const [placeOrderMutation, { isSuccess }] = useAddOrderMutation();
  const { users } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data }) => ({
      users: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  const { refetch } = useGetOrdersQuery();

  const findUser = users?.find((user) => user.username === username);

  const handlePlaceOrder = async () => {
    try {
      await placeOrderMutation({
        userObjId: findUser?.id,
        username: findUser?.username,
        items: cartItems?.map((item) => {
          return {
            itemObjId: item?.id,
            itemName: item?.itemName,
            quantity: item?.cartQuantity,
            price: item?.price,
            amount: item?.cartQuantity * item?.price,
          };
        }),
      });

      dispatch(clearCart());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // refetch();
      navigate("/dash/success");
    }
  }, [isSuccess, navigate]);

  const content = cartItems?.map((item) => (
    <Cart key={item?._id} item={item} />
  ));

  return (
    <div className="mt-[3rem]">
      <div>
        {username && <CustomerNavBar />}
        {cartItems?.length ? (
          <div className="sm:flex bg-gray-100 min-h-[100vh] ">
            <div className=" m-2 sm:w-[70%] bg-white p-2">
              <div className="flex flex-row relative">
                <h2 className="text-3xl">Shopping Cart</h2>
                <p className=" absolute right-4 bottom-0 text-xl">Price</p>
              </div>
              <hr className="mb-2 mt-1" />
              <div className="w-full h-auto">{content}</div>
              <hr className="mt-1 mb-1" />
              <div className="text-sm text-right">
                <p className=" font-bold p-2">{`Subtotal ( ${cartTotalQuantity} ${
                  cartTotalQuantity > 1 ? "items" : "item"
                }) : $ ${cartTotalAmount}`}</p>
              </div>
            </div>
            <div className="sm:w-[30%] p-2 ">
              <div className="mb-2 h-[40%]  bg-white">
                <div className="flex flex-row p-2">
                  <AiOutlineCheckCircle className="bg-green-500 text-white rounded-full text-4xl font-extrabold mr-2 h-fit w-fit" />
                  <p className="text-sm">
                    Your order qualifies for FREE Shipping. Choose this option
                    at checkout. See details
                  </p>
                </div>
                <div className="p-2 flex flex-row justify-around font-bold">
                  <div className="flex flex-col mr-2">
                    <p>
                      Sub Total{" "}
                      <span className="text-sm">{`(${cartTotalQuantity} ${
                        cartTotalQuantity > 1 ? "items" : "item"
                      })`}</span>
                    </p>
                    <p>Sales Tax </p>
                    <p>Grand Total </p>
                  </div>
                  <div className="w-fit mr-1">
                    <p>:</p>
                    <p>:</p>
                    <p>:</p>
                  </div>
                  <div className="flex flex-col items-end ">
                    <p>{cartTotalAmount}</p>
                    <p>{Number(cartTotalAmount * 0.08).toFixed(2)}</p>
                    <p>
                      {(
                        Number(cartTotalAmount * 0.08) + Number(cartTotalAmount)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                {username ? (
                  <div className="p-2">
                    <button
                      onClick={handlePlaceOrder}
                      className=" w-full rounded-lg bg-pink-400 p-1 text-sm hover:bg-green-500 hover:text-white"
                    >
                      Place Order
                    </button>
                  </div>
                ) : (
                  <div className="p-2">
                    <button
                      onClick={() => navigate("/login")}
                      className=" w-full rounded-lg bg-pink-400 p-1 text-sm hover:bg-green-500 hover:text-white"
                    >
                      Proceed to Check Out
                    </button>
                  </div>
                )}
              </div>
              <div className="border-2 h-[60%] p-2 bg-white"></div>
            </div>
          </div>
        ) : (
          <Result
            title="Your cart is empty "
            extra={
              <button
                onClick={() => {
                  if (username) {
                    navigate("/dash");
                  } else {
                    navigate("/");
                  }
                }}
                className="bg-slate-700 text-white p-1 px-4 border border-gray-200 rounded-md"
              >
                Go to Home
              </button>
            }
          />
        )}
      </div>
    </div>
  );
};

export default ListCart;
