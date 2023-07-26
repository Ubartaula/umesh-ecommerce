import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index >= 0) {
        state.cartItems[index].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeProductFromCart(state, action) {
      const findProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      const newCartItems = state.cartItems.filter(
        (item) => item.id !== findProduct.id
      );
      state.cartItems = newCartItems;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      return state;
    },

    decreaseCartQuantity(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[index].cartQuantity > 1) {
        state.cartItems[index].cartQuantity -= 1;
      } else if (state.cartItems[index].cartQuantity === 1) {
        const newCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = newCartItems;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      return state;
    },

    getTotals(state, action) {
      const { totalAmount, totalQuantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.totalAmount += itemTotal;
          cartTotal.totalQuantity += cartQuantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQuantity: 0,
        }
      );
      state.cartTotalQuantity = totalQuantity;
      state.cartTotalAmount = parseFloat(totalAmount).toFixed(2);
      return state;
    },

    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cart", []);
      // localStorage.clear(); it deletes every thins that were on LS
    },
  },
});

export default cartSlice.reducer;
export const {
  addProductToCart,
  removeProductFromCart,
  decreaseCartQuantity,
  getTotals,
  clearCart,
} = cartSlice.actions;
// export const currentCart = (state) => state.cart.cartItems;
export const currentCartState = (state) => state.cart;
