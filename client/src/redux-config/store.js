import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import DoctorSlice from "./DoctorSlice";

const store = configureStore({
  reducer: {
    User: UserSlice,
    Doctor: DoctorSlice,
  },
});

export default store;
