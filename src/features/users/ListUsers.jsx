import React from "react";
import { useGetUsersQuery } from "./userApiSlice";
import User from "./User";

const ListUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUsersQuery("listUsers", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <p>users page is loading....</p>;
  }

  if (isError) {
    return <p>users page has error ...{error?.data?.message}</p>;
  }

  let content;
  if (isSuccess) {
    const { ids } = users;
    content = ids?.map((id) => <User key={id} userId={id} />);
  }

  return (
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>User Email</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default ListUsers;
