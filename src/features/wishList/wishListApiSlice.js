import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const wishListAdapter = createEntityAdapter({
  sortComparer: (a, b) => b?.createdAt?.localeCompare(a?.createdAt),
});
const initialState = wishListAdapter.getInitialState();

export const wishListApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishLists: builder.query({
      query: () => ({
        url: "/wish_lists",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const loadedData = responseData?.map((wishList) => {
          wishList.id = wishList._id;
          return wishList;
        });
        return wishListAdapter.setAll(initialState, loadedData);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "WishList", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    addWishList: builder.mutation({
      query: (postData) => ({
        url: "/wish_lists",
        method: "POST",
        body: postData,
      }),

      invalidatesTags: [{ type: "WishList", id: "LIST" }],
    }),

    editWishList: builder.mutation({
      query: (editData) => ({
        url: "/wish_lists",
        method: "PUT",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "WishList", id: arg.id }],
    }),

    deleteWishList: builder.mutation({
      query: ({ id }) => ({
        url: "/wish_lists",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [{ type: "WishList", id: "LIST" }],
    }),

    // all end
  }),
});

export const {
  useGetWishListsQuery,
  useAddWishListMutation,
  useEditWishListMutation,
  useDeleteWishListMutation,
} = wishListApiSlice;
