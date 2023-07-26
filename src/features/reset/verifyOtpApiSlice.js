import apiSlice from "../../app/api/apiSlice";

const verifyOptApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyOpt: builder.mutation({
      query: (opt) => ({
        url: "/reset",
        method: "POST",
        body: { ...opt },
      }),
    }),

    //
  }),
});

export const { useVerifyOptMutation } = verifyOptApiSlice;
