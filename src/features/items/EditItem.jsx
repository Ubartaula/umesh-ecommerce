import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteItemMutation,
  useEditItemMutation,
  useGetItemsQuery,
} from "./itemApiSlice";

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[id],
    }),
  });

  const [editItemMutation, { isSuccess }] = useEditItemMutation();
  const [deleteItemMutation, { isSuccess: isSuccessDelete }] =
    useDeleteItemMutation();

  const [itemCode, setItemCode] = useState(item?.itemCode);
  const [itemName, setItemName] = useState(item?.itemName);
  const [sku, setSku] = useState(item?.sku);
  const [category, setCategory] = useState(item?.category);
  const [itemDescription, setItemDescription] = useState(item?.itemDescription);
  const [quantity, setQuantity] = useState(item?.quantity);
  const [price, setPrice] = useState(item?.price);

  const handleSubmit = async () => {
    try {
      await editItemMutation({
        id: item?.id,
        itemCode,
        itemName,
        sku,
        category,
        itemDescription,
        quantity,
        price,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItemMutation({ id: item?.id });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess || isSuccessDelete) {
      navigate("/dash/items");
    }
  }, [isSuccess, isSuccessDelete, navigate]);

  return (
    <div className="mx-auto w-full max-w-[80%]">
      <form
        encType="multipart/form-data"
        onSubmit={(e) => e.preventDefault()}
        className="border border-gray-600 bg-slate-100 rounded-md"
      >
        <div className="p-2 flex justify-evenly ">
          <div className="p-2 flex flex-col">
            <label htmlFor="" className="mb-1 py-1">
              Item Code
            </label>
            <label htmlFor="" className="mb-1">
              Item Name
            </label>
            <label htmlFor="" className="mb-1">
              SKU
            </label>
            <label htmlFor="" className="mb-1">
              Category
            </label>
            <label htmlFor="" className="mb-1">
              Quantity
            </label>
            <label htmlFor="" className="mb-1">
              Price
            </label>

            <label htmlFor="" className="mb-1">
              Item Descriptions
            </label>
          </div>
          <div className="p-2 flex flex-col w-full">
            <input
              required
              type="text"
              name="itemCode"
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              className="border border-blue-500 px-1 mb-1 "
            />
            <input
              required
              type="text"
              name="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="border border-blue-500 px-1 mb-1"
            />
            <input
              required
              type="text"
              name="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="border border-blue-500 px-1 mb-1"
            />
            <input
              required
              type="text"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-blue-500 px-1 mb-1"
            />
            <input
              required
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              // onChange={(e) => setQuantity(e.target.value)}
              className="border border-blue-500 px-1 mb-1"
            />
            <input
              required
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              //onChange={(e) => setPrice(e.target.value)}
              className="border border-blue-500 px-1 mb-1"
            />

            <textarea
              required
              rows={4}
              type="text"
              name="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="border border-blue-500 px-1 mb-1 "
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-around m-2">
          <button
            onClick={handleSubmit}
            className="min-w-[6rem] border border-blue-500 bg-pink-400 rounded-lg p-1 px-3 hover:bg-sky-500 hover:text-white"
          >
            Submit
          </button>
          <button
            onClick={handleDelete}
            className="min-w-[6rem] border border-blue-500 bg-pink-400 rounded-lg p-1 px-3 hover:bg-sky-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItem;
