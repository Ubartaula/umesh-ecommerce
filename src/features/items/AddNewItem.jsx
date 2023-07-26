import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAddItemMutation } from "./itemApiSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../lib/Loading";

const AddNewItem = () => {
  const navigate = useNavigate();
  const [addItem, { isSuccess, isLoading }] = useAddItemMutation();

  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  // const handleOnChangeOFImage = (e) => {
  //   const data = e.target.files[0];

  //   setImage((preview) => {
  //     return {
  //       ...preview,
  //       image: data,
  //     };
  //   });
  // };

  const formData = new FormData();
  formData.append("itemCode", itemCode);
  formData.append("itemName", itemName);
  formData.append("sku", sku);
  formData.append("category", category);
  formData.append("itemDescription", itemDescription);
  formData.append("quantity", quantity);
  formData.append("price", price);
  for (const key of Object.keys(images)) {
    formData.append("images", images[key]);
  }

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("itemCode", itemCode);
      formData.append("itemName", itemName);
      formData.append("sku", sku);
      formData.append("category", category);
      formData.append("itemDescription", itemDescription);
      formData.append("quantity", quantity);
      formData.append("price", price);
      for (const key of Object.keys(images)) {
        formData.append("images", images[key]);
      }

      await addItem(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/items");
    }
  }, [isSuccess, navigate]);

  const handleOnChangeItemCode = useCallback((e) => {
    setItemCode(e?.target?.value);
  }, []);
  const handleOnChangeItemName = useCallback((e) => {
    setItemName(e?.target?.value);
  }, []);
  const handleOnChangeSku = useCallback((e) => {
    setSku(e?.target?.value);
  }, []);
  const handleOnChangeQuantity = useCallback((e) => {
    setQuantity(e?.target?.value);
  }, []);
  const handleOnChangePrice = useCallback((e) => {
    setPrice(e?.target?.value);
  }, []);
  const handleOnChangeImage = useCallback((e) => {
    setImages(e?.target?.files);
  }, []);

  return (
    <div>
      {isLoading && <Loading />}
      <div className="mx-auto p-2 min-h-[100vh] bg-slate-300">
        <div className="mx-auto flex justify-center">
          <form
            encType="multipart/form-data"
            onSubmit={(e) => e.preventDefault()}
            className="border border-gray-600 bg-slate-100 rounded-md p-5"
          >
            <div className="p-2 flex ">
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
                  Image
                </label>
                <label htmlFor="" className="mb-1">
                  Item Descriptions
                </label>
              </div>
              <div className="p-2 flex flex-col">
                <input
                  required
                  type="text"
                  name="itemCode"
                  value={itemCode}
                  onChange={handleOnChangeItemCode}
                  className="border border-blue-500 px-1 mb-1"
                />
                <input
                  required
                  type="text"
                  name="itemName"
                  value={itemName}
                  onChange={handleOnChangeItemName}
                  className="border border-blue-500 px-1 mb-1"
                />
                <input
                  required
                  type="text"
                  name="sku"
                  value={sku}
                  onChange={handleOnChangeSku}
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
                  onChange={handleOnChangeQuantity}
                  // onChange={(e) => setQuantity(e.target.value)}
                  className="border border-blue-500 px-1 mb-1"
                />
                <input
                  required
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleOnChangePrice}
                  //onChange={(e) => setPrice(e.target.value)}
                  className="border border-blue-500 px-1 mb-1"
                />
                <input
                  multiple
                  type="file"
                  name="images"
                  onChange={(e) => setImages(e.target.files)}
                  className="border border-blue-500 px-1 mb-1"
                />
                <textarea
                  required
                  rows={3}
                  type="text"
                  name="itemDescription"
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  className="border border-blue-500 px-1 mb-1 w-full "
                />
              </div>
            </div>
            <div className="text-center m-2">
              <button
                className="border border-blue-500 bg-pink-400 rounded-lg p-1 px-3 hover:bg-sky-500 hover:text-white"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewItem;
