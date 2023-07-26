import React from "react";
import { useGetUsersQuery } from "./userApiSlice";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("listUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });
  return (
    <tr>
      <td>{user?.username}</td>
      <td>{user?.email}</td>
    </tr>
  );
};

export default React.memo(User);
