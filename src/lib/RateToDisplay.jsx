import React from "react";
import { Rate } from "antd";
import { useGetItemsQuery } from "../features/items/itemApiSlice";

const RateToDisplay = ({ itemId }) => {
  const { item } = useGetItemsQuery("listItems", {
    selectFromResult: ({ data }) => ({
      item: data?.entities[itemId],
    }),
  });

  const scoreArray = item?.review?.map((rv) => rv.score);
  const length = scoreArray?.length ? scoreArray?.length : "";

  const avg = Number(
    scoreArray?.reduce((prev, curr) => {
      return prev + curr;
    }, 0) / length
  );

  /// up

  const displayScore =
    avg > 0 && avg <= 0.5
      ? 0.5
      : avg > 0.5 && avg <= 1
      ? 1
      : avg > 1 && avg <= 1.5
      ? 1.5
      : avg > 1.5 && avg <= 2
      ? 2
      : avg > 2 && avg <= 2.5
      ? 2.5
      : avg > 2.5 && avg <= 3
      ? 3
      : avg > 3 && avg <= 3.5
      ? 3.5
      : avg > 3.5 && avg <= 4
      ? 4
      : avg > 4 && avg <= 4.5
      ? 4.5
      : avg > 4.5
      ? 5
      : 0;

  const countRating =
    length > 1 ? "ratings" : length === 1 ? "rating" : "no rating";

  return (
    <div className="max-h-fit flex flex-row items-center justify-start p-2 ">
      <p className="px-1 mr-1 text-sm text-blue-900 w-fit">{displayScore}</p>
      <Rate
        style={{ font: "icon" }}
        className="hover:cursor-pointer text-sm "
        defaultValue={displayScore}
        allowHalf
        disabled
        // style={{ zIndex: 0 }}
      />
      <span className="text-sm ml-2 text-blue-900 w-fit hover:text-yellow-800 hover:underline underline-offset-2">
        {length} {countRating}
      </span>
    </div>
  );
};

export default React.memo(RateToDisplay);
