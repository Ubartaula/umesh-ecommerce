import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { usePatchOrderMutation } from "../features/order/orderApiSlice";
import { usePatchItemMutation } from "../features/items/itemApiSlice";

const RateForCustomer = ({ order, orderItem, orderRefetch }) => {
  const navigate = useNavigate();
  const [score, setScore] = useState(3);
  const [comment, setComment] = useState("");

  const [itemPatchToAddReview, { isSuccess }] = usePatchItemMutation();
  const [patchOrder, { isSuccess: isSuccessPatchOrder }] =
    usePatchOrderMutation();

  const handleSubmitReview = async () => {
    try {
      await itemPatchToAddReview({
        id: orderItem?.itemObjId,
        userObjId: order?.userObjId,
        orderObjId: order?.id,
        score: score,
        text: comment,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePatchOrder = async () => {
    try {
      await patchOrder({
        id: order?.id,
        _id: orderItem?._id,
        isReviewed: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBoth = () => {
    handleSubmitReview();
    handlePatchOrder();
    orderRefetch();
  };

  useEffect(() => {
    if (isSuccess && isSuccessPatchOrder) {
      navigate("/dash/customer-profile");
    }
  }, [isSuccess, isSuccessPatchOrder, navigate]);

  return (
    <div className="mb-3">
      {!order?.isReviewed ? (
        <div className="">
          <div className="flex flex-row items-center bg-white w-full px-1 ">
            <Rate
              className="text-2xl bg-white max-w-fit p-1 px-3"
              defaultValue={4}
              allowHalf
              onChange={(value) => setScore(value)}
            />
            <p className="ml-2 font-mono text-red-500">{score}</p>
          </div>
          <div className="bg-white w-full px-1">
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-1"
              name=""
              id=""
              rows="2"
              placeholder="write review here..."
            />
          </div>
          <button
            disabled={!(score && comment)}
            onClick={handleBoth}
            className={` ${
              comment ? "bg-pink-400 hover:bg-yellow-400" : "bg-slate-300"
            }   p-1 px-2 w-full rounded-lg`}
          >
            Submit review
          </button>
        </div>
      ) : (
        <p className="text-xl font-light px-4 mb-3 ">
          You have already submitted review
        </p>
      )}
    </div>
  );
};

export default React.memo(RateForCustomer);
