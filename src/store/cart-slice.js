import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingCartItem = state.items.find(item => item.id === newItem.id)

            if (!existingCartItem) {
                state.items.push({
                    itemId: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingCartItem.quantity += newItem.quantity;
                existingCartItem.totalPrice += newItem.price
            }

        },
        removeItemFromCart() { },

    }
})

export const uiActions = cartSlice.actions;
export default cartSlice