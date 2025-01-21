import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "DoctorSlice",
  initialState: {
    doctor: {},
    token: null,
    message: "",
    isLoggedIn: false,
  },
  reducers: {
    setDoctor: (state, action) => {
      console.log(action.payload);
      state.message = action.payload.message;
      state.token = action.payload.token;
      state.doctor = action.payload.doctor;
      state.isLoggedIn = true;
      delete state.doctor.password;
    },
    signOut: (state, action) => {
      state.doctor = {};
      state.token = null;
      state.message = "";
      state.isLoggedIn = false;
    },
  },
});
export const { setDoctor, signOut } = slice.actions;
export default slice.reducer;
