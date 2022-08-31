import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from "./currenciesSlice";
import categoriesReducer from "./categoriesSlice";
import productsInCartReducer from "./productsInCartSlice";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    categories: categoriesReducer,
    productsInCart: productsInCartReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
