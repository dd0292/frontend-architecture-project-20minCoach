import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import coachesReducer from "../slices/coachesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coaches: coachesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
