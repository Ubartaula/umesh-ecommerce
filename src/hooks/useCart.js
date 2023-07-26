import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentCartState, getTotals } from "../features/cart/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();
  const cartState = useSelector(currentCartState);
  const cartItems = cartState.cartItems;
  const cartTotalQuantity = cartState.cartTotalQuantity;
  const cartTotalAmount = cartState.cartTotalAmount;

  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  return { cartItems, cartTotalAmount, cartTotalQuantity };
};

export default useCart;
