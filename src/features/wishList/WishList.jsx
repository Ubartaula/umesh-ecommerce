import React from "react";
import { useGetWishListsQuery } from "./wishListApiSlice";

const WishList = ({ itemId }) => {
  const { wishList } = useGetWishListsQuery("listWishLists", {
    selectFromResult: ({ data }) => ({
      wishList: data?.entities[itemId],
    }),
  });

  return (
    <div className="mt-[3rem]">
      <div>
        <p>{wishList?.itemName}</p>
      </div>
    </div>
  );
};

export default WishList;
