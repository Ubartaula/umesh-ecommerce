import React from "react";
import { useGetOrdersQuery } from "./orderApiSlice";
import Order from "./Order";
import { Link } from "react-router-dom";

const ListOrder = () => {
  // const { totalAmount, totalQty } = OrderCurrentState();

  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetOrdersQuery("listOrders", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  // const arr = [
  //   { name: "Umesh", price: 23, qty: 2 },
  //   { name: "ramesh", price: 23, qty: 4 },
  // ];
  // arr.reduce((prev, current) => {
  //   const total = current.price * current.qty;
  //   return prev + total;
  // }, 0);

  if (isLoading) {
    return <p>orders page is loading...</p>;
  }

  if (isError) {
    return <p>orders page has error...{error?.data?.message}</p>;
  }

  let content;
  if (isSuccess) {
    const { ids } = orders;
    content = ids?.map((id) => <Order key={id} orderId={id} />);
  }

  return (
    <div className="">
      <div>
        <Link to="/">Go Back Home</Link>
      </div>
      <table className="mx-auto w-full max-w-md bg-slate-200 text-left">
        <thead>
          <tr>
            <th className="border border-blue-500 p-1 min-w-[4rem]">Name</th>
            <th className="border border-blue-500 p-1 min-w-[4rem]">
              Quantity
            </th>
            <th className="border border-blue-500 p-1 min-w-[4rem]">Price</th>
            <th className="border border-blue-500 p-1 min-w-[4rem]">Amount</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
        <tfoot>
          <tr>
            <th className="border border-blue-500 p-1 min-w-[4rem]">
              Total Order Amount
            </th>
            {/* <th className="border border-blue-500 p-1 min-w-[4rem]">
              {totalQty || ""}
            </th> */}
            {/* <th
              colSpan={2}
              className="border border-blue-500 p-1 min-w-[4rem] text-center"
            >
              {totalAmount || ""}
            </th> */}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ListOrder;
