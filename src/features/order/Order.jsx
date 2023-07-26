import React, { useEffect, useState } from "react";
import { useGetOrdersQuery, usePatchOrderMutation } from "./orderApiSlice";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Order = ({ orderId }) => {
  const navigate = useNavigate();
  const { order } = useGetOrdersQuery("listOrders", {
    selectFromResult: ({ data }) => ({
      order: data?.entities[orderId],
    }),
  });

  const [input, setInput] = useState(order?.quantity);

  const [patchOrderQuantity, { isSuccess }] = usePatchOrderMutation();

  const quantityUp = async () => {
    try {
      await patchOrderQuantity({
        id: order?._id,
        quantity: order?.quantity + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const quantityDown = async () => {
    try {
      await patchOrderQuantity({
        id: order?._id,
        quantity: order?.quantity - 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/orders");
    }
  }, [isSuccess]);

  return (
    <tr>
      <td className="border border-blue-500 p-1 min-w-[4rem]">
        {order?.itemName}
      </td>
      <td className="border border-blue-500 p-1 min-w-[4rem] relative">
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />

          <div className="mb-2 ">
            <RiArrowUpSLine
              onClick={quantityUp}
              className=" absolute top-0.5 right-1 bg-yellow-500 font-bold hover:cursor-pointer"
            />
          </div>
          <div className="">
            <RiArrowDownSLine
              onClick={quantityDown}
              className=" absolute bottom-0.5 right-1  bg-yellow-500 font-bold hover:cursor-pointer"
            />
          </div>
        </div>
      </td>
      <td className="border border-blue-500 p-1 min-w-[4rem]">
        {order?.price}
      </td>
      <td className="border border-blue-500 p-1 min-w-[4rem]">
        {order?.amount}
      </td>
    </tr>
  );
};

export default React.memo(Order);
