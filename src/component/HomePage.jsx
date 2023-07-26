import React from "react";
import { useGetItemsQuery } from "../features/items/itemApiSlice";
import HomeContent from "./HomeContent";
import Loading from "../lib/Loading";
import useTitle from "../hooks/useTitle";

const HomePage = () => {
  useTitle("Umesh-Ecommerce");

  const { data, isLoading, isError, error, isSuccess } = useGetItemsQuery(
    "listItems",
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>page has error {error?.data?.message}</p>;
  }

  let homeContent;
  if (isSuccess) {
    const items = data?.ids?.map((id) => data?.entities[id]);
    homeContent = <HomeContent items={items} />;
  }

  return homeContent;
};

export default HomePage;
