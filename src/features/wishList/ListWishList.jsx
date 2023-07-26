import React from "react";
import { useGetWishListsQuery } from "./wishListApiSlice";
import Loading from "../../lib/Loading";
import WishList from "./WishList";

const ListWishList = () => {
  const { data, isSuccess, isLoading, isError, error } = useGetWishListsQuery(
    "listWishLists",
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  let content;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    content = <p>wishList page has error : - {error?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = data;
    content = ids?.map((itemId) => <WishList key={itemId} itemId={itemId} />);
  }

  return content;
};

export default ListWishList;
