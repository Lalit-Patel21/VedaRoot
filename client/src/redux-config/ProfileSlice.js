import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    role: null,
    token: null,
    message: "",
    isLoggedIn: false,
  },
  reducers: {
    setProfile: (state, action) => {
      console.log("Payload received in setProfile:", action.payload); // Debugging line
      const {
        profile = {},
        message = "",
        token = null,
        role = null,
      } = action.payload;
      state.profile = profile;
      state.message = message;
      state.token = token;
      state.role = role;
      state.isLoggedIn = true;
      if (state.profile && state.profile.password) {
        delete state.profile.password;
      }
      console.log("Updated state in setProfile:", state); // Debugging line
    },
    signOut: (state) => {
      state.profile = {};
      state.token = null;
      state.message = "";
      state.role = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setProfile, signOut } = ProfileSlice.actions;
export default ProfileSlice.reducer;
