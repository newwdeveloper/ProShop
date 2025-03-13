import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

//helper function to handle decimal
function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);
      console.log("Adding to cart:", item);
      if (existingItem) {
        //If the item is already in the cart, it replaces the old item with the new one.

        state.cartItems = state.cartItems.map((x) =>
          x._id === existingItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      //calculate item price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      //calculate shipping price,if price>100 shipping is 0 else 10$
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      //calculate taxPrice 18%gst
      state.taxPrice = addDecimals(
        Number((0.18 * state.itemsPrice).toFixed(2))
      );

      //calculate totalPrice
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      console.log("Updated Prices:", {
        itemsPrice: state.itemsPrice,
        shippingPrice: state.shippingPrice,
        taxPrice: state.taxPrice,
        totalPrice: state.totalPrice,
      });
      //store all to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
      console.log("Updated cart:", JSON.parse(localStorage.getItem("cart")));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      // Recalculate prices after removing an item
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      state.taxPrice = addDecimals(
        Number((0.18 * state.itemsPrice).toFixed(2))
      );

      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      // Update localStorage after removal
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
