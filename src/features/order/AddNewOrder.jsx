import React, { useCallback, useEffect, useState } from "react";
import { useGetItemsQuery } from "../items/itemApiSlice";
import { useAddOrderMutation } from "./orderApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetUsersQuery } from "../users/userApiSlice";

const AddNewOrder = () => {
  const navigate = useNavigate();
  const [addNewOrderMut, { isSuccess }] = useAddOrderMutation();
  const { username } = useAuth();
  console.log(username);

  const [userObjId, setUserObjId] = useState("");
  const [itemObjId, setItemObjId] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const amount = Number(quantity * price) || 0;

  const { items } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      items: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  const itemOption = items?.map((item) => {
    return (
      <option key={item.id} value={item.id}>
        {item?.itemName}
      </option>
    );
  });

  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[itemObjId],
    }),
  });

  useEffect(() => {
    setItemName(item?.itemName);
    setPrice(item?.price);
  }, [itemObjId]);

  // getting userObjId
  const { users } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data }) => ({
      users: data?.ids?.map((id) => data?.entities[id]),
    }),
  });

  const findLogInUser = users?.find((user) => user.username === username);

  const handleSubmit = async () => {
    try {
      await addNewOrderMut({
        userObjId: findLogInUser?.id,
        itemObjId,
        itemName,
        quantity,
        price,
        amount,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/orders");
    }
  }, [isSuccess, navigate]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="m-auto w-full max-w-md  bg-slate-200 p-5"
    >
      <div className="bg-slate-200 p-1 flex justify-around ">
        <div className="flex flex-col p-1">
          <label className="m-1" htmlFor="">
            Name
          </label>
          <label className="m-1" htmlFor="">
            Quantity
          </label>
          <label className="m-1" htmlFor="">
            Price
          </label>
          <label className="m-1" htmlFor="">
            Amount
          </label>
        </div>
        <div className="flex flex-col p-1">
          <select
            className="border border-blue-400 m-1 px-1"
            value={itemObjId}
            onChange={(e) => setItemObjId(e.target.value)}
          >
            <option>select item..</option>
            {itemOption}
          </select>
          {/* <input
            required
            className="border border-blue-400 m-1 px-1"
            type="text"
            value={itemName}
            onChange={(e) => setName(e.target.value)}
          /> */}
          <input
            required
            className="border border-blue-400 m-1 px-1"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            className="border border-blue-400 m-1 px-1"
            type="number"
            value={price || ""}
            readOnly
            // onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="border border-blue-400 m-1 px-1"
            type="number"
            value={amount || ""}
            readOnly
            // onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClickCapture={handleSubmit}
          className={`w-full p-1 my-2 rounded-md bg-pink-400`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNewOrder;
