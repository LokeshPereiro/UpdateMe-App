import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    appState: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
