import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  },
  reducers: {
    setLoginCredentials(state, action) {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },

    setLogout(state, action) {
      state.token = null;
    },
  },
});

export const { setLoginCredentials, setLogout } = authSlice.actions;
export default authSlice.reducer;

export const currentToken = (state) => state.auth.token;
