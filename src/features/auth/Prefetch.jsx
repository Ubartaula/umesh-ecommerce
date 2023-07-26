import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { orderApiSlice } from "../order/orderApiSlice";
import { itemApiSlice } from "../items/itemApiSlice";
import { userApiSlice } from "../users/userApiSlice";
import { wishListApiSlice } from "../wishList/wishListApiSlice";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      orderApiSlice.util.prefetch("getOrders", "listOrders", { force: true })
    );
    store.dispatch(
      itemApiSlice.util.prefetch("getItems", "listItems", { force: true })
    );

    store.dispatch(
      userApiSlice.util.prefetch("getUsers", "listUsers", { force: true })
    );

    store.dispatch(
      wishListApiSlice.util.prefetch("getWishLists", "listWishLists", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
