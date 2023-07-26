import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const itemAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = itemAdapter.getInitialState();

export const itemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: "/items",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const loadedData = responseData?.map((item) => {
          item.id = item._id;
          return item;
        });
        return itemAdapter.setAll(initialState, loadedData);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Item", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    addItem: builder.mutation({
      query: (postData) => ({
        url: "/items",
        method: "POST",
        body: postData,
      }),

      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),

    editItem: builder.mutation({
      query: (editData) => ({
        url: "/items",
        method: "PUT",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Item", id: arg.id }],
    }),
    patchItem: builder.mutation({
      query: (editData) => ({
        url: "/items",
        method: "PATCH",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Item", id: arg.id }],
    }),

    deleteItem: builder.mutation({
      query: ({ id }) => ({
        url: "/items",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),

    // all end
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
  usePatchItemMutation,
} = itemApiSlice;
