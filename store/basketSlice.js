import { createSlice } from '@reduxjs/toolkit';

const basketSlice = createSlice({
  name: 'basket',
  initialState: { items: [] },
  reducers: {
    addToBasket: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromBasket: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const item = state.items[itemIndex];
      if (item.quantity === 1) {
        state.items.splice(itemIndex, 1);
      } else {
        item.quantity--;
      }
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state) => state.basket.items;
export const selectTotalQuantity = (state) =>
  state.basket.items.reduce((total, item) => total + item.quantity, 0);
export const selectTotalPrice = (state) =>
  +state.basket.items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

export default basketSlice.reducer;
