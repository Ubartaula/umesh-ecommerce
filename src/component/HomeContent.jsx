import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../features/cart/cartSlice";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Rate } from "antd";
import { BsSearch } from "react-icons/bs";
import { GrSort } from "react-icons/gr";
import { useAddWishListMutation } from "../features/wishList/wishListApiSlice";
import useAuth from "../hooks/useAuth";
import RateToDisplay from "../lib/RateToDisplay";
import { toast } from "react-toastify";
import SearchResult from "./SearchResult";

const HomeContent = ({ items }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [itemsAfterSearch, setItemsAfterSearch] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [filterRate, setFilterRate] = useState(0);
  const [sorted, setSorted] = useState("idle");
  const [category, setCategories] = useState([]);

  const searchedData = items?.filter((item) =>
    item?.itemName?.toLowerCase()?.includes(searchInput.toLowerCase())
  );
  useEffect(() => {
    setItemsAfterSearch(searchedData);
  }, [searchInput]);

  const [showSortFilterMenu, setShowSortFilterMenu] = useState(false);

  const sortedData =
    sorted === false
      ? itemsAfterSearch?.sort((a, b) => b?.price - a?.price)
      : sorted === true
      ? itemsAfterSearch?.sort((a, b) => a?.price - b?.price)
      : itemsAfterSearch?.sort((a, b) => b?.createdAt - a?.createdAt);

  const handlePriceSort = () => {
    setSorted((prev) => !prev);
  };

  const handleToAddProductToCart = (product) => {
    try {
      dispatch(addProductToCart(product));
    } catch (error) {
      console.log(error);
    }
  };

  const categoriesData =
    category.length > 0
      ? sortedData.filter((p) => category.includes(p.category))
      : sortedData;

  const handleCategories = (e) => {
    if (e.target.checked) {
      setCategories([...category, e.target.value]);
    }
    if (!e.target.checked) {
      setCategories(category?.filter((cate) => cate !== e.target.value));
    }
  };

  const filterDataOnRatings = categoriesData?.filter((item) => {
    if (filterRate > 0) {
      const review = item?.review?.map((review) => review);
      const length = item?.review?.length;

      const average = Number(
        review?.reduce((prev, curr) => {
          const score = curr?.score;
          return prev + score;
        }, 0) / length
      );

      //return below here
      return average >= filterRate;
    } else {
      return categoriesData;
    }
  });

  let css5 = "";
  if (filterRate === 5) {
    css5 = "bg-slate-300 ";
  }
  let css4 = "";
  if (filterRate === 4) {
    css4 = "bg-slate-300 ";
  }
  let css3 = "";
  if (filterRate === 3) {
    css3 = "bg-slate-300 ";
  }
  let css2 = "";
  if (filterRate === 2) {
    css2 = "bg-slate-300 ";
  }
  let css1 = "";
  if (filterRate === 1) {
    css1 = "bg-slate-300 ";
  }
  let css0 = "";
  if (filterRate === 0) {
    css0 = "bg-slate-300 ";
  }

  const handleFilterRate = (number) => {
    setFilterRate(number);
  };

  // handle add to wish list
  const [addToWishListMutation, { isSuccess }] = useAddWishListMutation();
  const handleAddToWishList = async (item) => {
    try {
      await addToWishListMutation({
        itemObjId: item?.id,
        userObjId: userId,
        itemName: item?.itemName,
        image: item?.images[0],
      });
      toast.success("Item added to WishList", { position: "top-center" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 m-auto w-full  min-h-screen">
      <div
        // ref={ref}
        className={`fixed top-[3rem] left-0 right-0 z-50 flex flex-row items-center p-2 bg-sky-700 min-h-[3rem] max-h-[3rem]`}
      >
        {!showSortFilterMenu && (
          <div className="relative w-auto sm:w-fit  ">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="search..."
              className="px-2 p-1 rounded-xl w-full sm:min-w-[13rem] "
            />
            <BsSearch className=" absolute top-2 right-1" />
          </div>
        )}

        {!showSortFilterMenu && (
          <div className="ml-4 text-white  min-w-fit overflow-none">
            {searchInput && (
              <div className="">{searchedData?.length} search result. </div>
            )}
          </div>
        )}
        {!searchInput && (
          <div className="sm:hidden fixed top-14 right-2 z-50 ">
            <div
              onClick={() => setShowSortFilterMenu((prev) => !prev)}
              className="
            bg-white w-auto flex items-center justify-end text-black px-2 rounded-md p-1
             hover:bg-slate-300 hover:cursor-pointer "
            >
              {showSortFilterMenu && <p className="mr-5">Sort&Filter</p>}
              <GrSort className="text-2xl" />
            </div>

            {showSortFilterMenu && (
              <div className="bg-white p-1 mt-2 min-w-full">
                <p className="">Category</p>
                <div className="px-2 ">
                  <div className="">
                    <div className=" p-1 border px-2">
                      <input
                        id="Television"
                        value="Television"
                        type="checkbox"
                        className="mr-1"
                        onClick={handleCategories}
                      />
                      <label htmlFor="">TVs</label>
                    </div>
                    <div className=" p-1 border px-2">
                      <input
                        id="Camera"
                        value="Camera"
                        type="checkbox"
                        className="mr-1"
                        onClick={handleCategories}
                      />
                      <label htmlFor="">Cameras</label>
                    </div>
                    <div className=" p-1 border px-2">
                      <input
                        id="Watch"
                        value="Watch"
                        onClick={handleCategories}
                        type="checkbox"
                        className="mr-1"
                      />
                      <label htmlFor="">Watches</label>
                    </div>
                    <div className=" p-1 border px-2">
                      <input
                        id="Cloths"
                        value="Cloths"
                        onClick={handleCategories}
                        type="checkbox"
                        className="mr-1"
                      />
                      <label htmlFor="">Clothes</label>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => {
                    handlePriceSort();
                    setShowSortFilterMenu((prev) => !prev);
                  }}
                  className="flex flex-row items-center p-1 px-2 border rounded-lg mb-1 hover:cursor-pointer hover:bg-green-400 "
                >
                  <p className="mr-2 text-sm">Price Low to High</p>
                  {sorted !== "idle" && (
                    <div className="text-red-500">
                      {sorted ? <FaSortAmountDown /> : <FaSortAmountUpAlt />}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {!searchInput && (
          <div className="w-full mr-3  hidden sm:block  ">
            <p className=" text-right  capitalize text-white animate-pulse">
              bumper offer @10% off on every purchases, hurry up !!!{" "}
            </p>
          </div>
        )}
      </div>

      <div className="mt-[6rem] bg-gray-100 flex flex-row p-2">
        <div className="min-w-[14rem] bg-slate-300 rounded-lg border border-slate-400 hidden md:block mr-2">
          <div className="p-1 ">
            <div className=" mb-2  bg-white p-2">
              <p className="text-sm font-semibold underline">Catagories</p>
              <div>
                <div className=" p-1 border px-2">
                  <input
                    id="Television"
                    value="Television"
                    type="checkbox"
                    className="mr-1"
                    onClick={handleCategories}
                  />
                  <label htmlFor="">TVs</label>
                </div>
                <div className=" p-1 border px-2">
                  <input
                    id="Camera"
                    value="Camera"
                    type="checkbox"
                    className="mr-1"
                    onClick={handleCategories}
                  />
                  <label htmlFor="">Cameras</label>
                </div>
                <div className=" p-1 border px-2">
                  <input
                    id="Watch"
                    value="Watch"
                    onClick={handleCategories}
                    type="checkbox"
                    className="mr-1"
                  />
                  <label htmlFor="">Watches</label>
                </div>
                <div className=" p-1 border px-2">
                  <input
                    id="Cloths"
                    value="Cloths"
                    onClick={handleCategories}
                    type="checkbox"
                    className="mr-1"
                  />
                  <label htmlFor="">Clothes</label>
                </div>
              </div>
            </div>

            <div className=" mb-2  bg-white p-2">
              <p className="text-sm p-1 font-semibold underline">
                Customer Reviews
              </p>
              <div
                onClick={() => handleFilterRate(5)}
                className={`mb-1 ${css5} z-0  text-sm flex items-center border rounded-lg hover:border-blue-500  hover:cursor-pointer p-1`}
              >
                <Rate
                  className="px-2 hover:cursor-pointer"
                  defaultValue={5}
                  disabled
                  style={{ zIndex: 0 }}
                />
              </div>
              <div
                onClick={() => handleFilterRate(4)}
                className={`mb-1 ${css4} flex flex-row items-center text-sm  border rounded-lg hover:border-blue-500  hover:cursor-pointer  p-1`}
              >
                <Rate
                  className="px-2 hover:cursor-pointer"
                  defaultValue={4}
                  disabled
                  style={{ zIndex: 0 }}
                />
                <p className="text-xs">& Up </p>
              </div>
              <div
                onClick={() => handleFilterRate(3)}
                className={`mb-1 ${css3} flex flex-row items-center text-sm  border rounded-lg hover:border-blue-500  hover:cursor-pointer p-1`}
              >
                <Rate
                  className="px-2 hover:cursor-pointer"
                  defaultValue={3}
                  disabled
                  style={{ zIndex: 0 }}
                />
                <p className="text-xs">& Up </p>
              </div>
              <div
                onClick={() => handleFilterRate(2)}
                className={`mb-1 ${css2} flex flex-row items-center text-sm  border rounded-lg hover:border-blue-500  hover:cursor-pointer  p-1`}
              >
                <Rate
                  className="px-2 hover:cursor-pointer"
                  defaultValue={2}
                  disabled
                  style={{ zIndex: 0 }}
                />
                <p className="text-xs">& Up </p>
              </div>
              <div
                onClick={() => handleFilterRate(1)}
                className={`mb-1 ${css1} flex flex-row items-center text-sm  border rounded-lg hover:border-blue-500  hover:cursor-pointer p-1`}
              >
                <Rate
                  className="px-2 hover:cursor-pointer"
                  defaultValue={1}
                  disabled
                  style={{ zIndex: 10 }}
                />
                <p className="text-xs">& Up </p>
              </div>
              <div
                onClick={() => handleFilterRate(0)}
                className={`mb-1 ${css0} flex flex-row items-center text-sm  border rounded-lg hover:border-blue-500  hover:cursor-pointer p-1`}
              >
                <Rate
                  className="px-2 hover:cursor-pointer"
                  defaultValue={0}
                  disabled
                  style={{ zIndex: 10 }}
                />
                <p className="text-xs">& Up </p>
              </div>
            </div>

            <div className=" mb-2  bg-white p-2">
              <p className="text-sm p-1 font-semibold underline capitalize">
                sort on price level
              </p>
              <div
                onClick={handlePriceSort}
                className="flex flex-row items-center p-1 px-2 border rounded-lg mb-1 hover:cursor-pointer hover:bg-green-400 "
              >
                <p className="mr-2 text-sm">Price Low to High</p>
                {sorted !== "idle" && (
                  <div className="text-red-500">
                    {sorted ? <FaSortAmountDown /> : <FaSortAmountUpAlt />}
                  </div>
                )}
              </div>
            </div>
            <hr className=" border-t-1 border-gray-300" />
          </div>
        </div>
        {filterDataOnRatings?.length > 0 ? (
          <div
            className={`
           w-full h-full flex flex-col  sm:grid sm:grid-cols-2 lg:grid-cols-3`}
          >
            {filterDataOnRatings?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col m-1 sm:flex-col p-1 sm:p-1   bg-gray-400 rounded-md "
                >
                  <div className=" ">
                    <div className=" p-1 bg-gray-100 flex flex-row   ">
                      <div className="w-[5rem]">
                        <img
                          src={item.images[0]}
                          alt=""
                          className="max-h-[6rem] min-h-[6rem] w-full"
                        />
                      </div>
                      <div className=" w-[10rem] ml-1 sm:ml-3 flex flex-col">
                        <p
                          className="font-semibold hover:text-blue-500  hover:cursor-pointer hover:underline underline-offset-4 "
                          onClick={() => {
                            if (userId) {
                              navigate(`/dash/${item.id}/item`);
                            } else {
                              navigate(`/${item.id}/item`);
                            }
                          }}
                        >
                          {item?.itemName}
                        </p>
                        <p className="text-sm">
                          Stock available {item?.quantity} Pcs
                        </p>
                        <div className="flex flex-row">
                          <p className="p-1">$</p>
                          <p className=" text-3xl">{parseInt(item?.price)}</p>
                          <p>99</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-100 px-1 hover:cursor-pointer">
                      <button
                        onClick={() => {
                          if (userId) {
                            navigate(`/dash/${item.id}/reviews`);
                          } else {
                            navigate(`/${item.id}/reviews`);
                          }
                        }}
                      >
                        <RateToDisplay itemId={item?.id} />
                      </button>
                    </div>
                  </div>
                  <div className="p-1 bg-gray-100 flex flex-col sm:flex-row justify-around">
                    <button
                      onClick={() => {
                        handleToAddProductToCart(item);
                        if (userId) {
                          navigate("/dash/carts");
                        } else {
                          navigate("/carts");
                        }
                      }}
                      className={`${
                        !userId ? "w-full" : ""
                      }  bg-blue-900 text-white min-w-[7rem] p-1 px-2 border-2 border-gray-300 text-sm rounded-lg  hover:bg-green-400 hover:text-white`}
                    >
                      Add to Cart
                    </button>
                    {userId && (
                      <button
                        onClick={() => handleAddToWishList(item)}
                        className="bg-pink-900 text-white min-w-[7rem] p-1 px-2 border-2 border-gray-300 text-sm rounded-lg hover:bg-green-400 hover:text-white"
                      >
                        Save for Later
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <SearchResult />
        )}
      </div>
    </div>
  );
};

export default React.memo(HomeContent);
