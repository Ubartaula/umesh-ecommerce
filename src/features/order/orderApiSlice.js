import { createEntityAdapter } from "@reduxjs/toolkit";
import apiSlice from "../../app/api/apiSlice";

const orderAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const initialState = orderAdapter.getInitialState();

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const loadedData = responseData?.map((order) => {
          order.id = order._id;
          return order;
        });
        return orderAdapter.setAll(initialState, loadedData);
      },

      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Order", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    addOrder: builder.mutation({
      query: (postData) => ({
        url: "/orders",
        method: "POST",
        body: postData,
      }),

      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),

    editOrder: builder.mutation({
      query: (editData) => ({
        url: "/orders",
        method: "PUT",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Order", id: arg.id }],
    }),
    patchOrder: builder.mutation({
      query: (editData) => ({
        url: "/orders",
        method: "PATCH",
        body: { ...editData },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Order", id: arg.id }],
    }),

    deleteOrder: builder.mutation({
      query: ({ id }) => ({
        url: "/orders",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),

    // all end
  }),
});

export const {
  useGetOrdersQuery,
  useAddOrderMutation,
  useEditOrderMutation,
  useDeleteOrderMutation,
  usePatchOrderMutation,
} = orderApiSlice;
