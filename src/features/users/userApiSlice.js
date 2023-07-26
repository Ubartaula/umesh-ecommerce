import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const userAdapter = createEntityAdapter({});
const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const loadedData = responseData?.map((user) => {
          user.id = user._id;
          return user;
        });
        return userAdapter.setAll(initialState, loadedData);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    addUser: builder.mutation({
      query: (postData) => ({
        url: "/users",
        method: "POST",
        body: { ...postData },
        formData: true,
      }),

      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    editUser: builder.mutation({
      query: (editData) => ({
        url: "/users",
        method: "PUT",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "User", id: arg.id }],
    }),

    patchUser: builder.mutation({
      query: (editData) => ({
        url: "/users",
        method: "PATCH",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "User", id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // all end
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  usePatchUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
