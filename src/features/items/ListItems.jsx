import React, { useEffect } from "react";
import { useGetItemsQuery } from "./itemApiSlice";
import Item from "./Item";

const ListItems = () => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery("listItems", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <p className="text-red-500 font-extrabold text-3xl m-auto w-full max-w-md mt-4">
        items page is loading...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 font-extrabold text-3xl m-auto w-full max-w-md mt-4">
        items page has error : {error?.data?.message}
      </p>
    );
  }

  let content;
  if (isSuccess) {
    const { ids } = items;
    content = ids?.map((id) => <Item key={id} itemId={id} />);
  }

  return content;
};

export default ListItems;
