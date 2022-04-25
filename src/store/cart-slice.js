import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingCartItem = state.items.find(item => item.id === newItem.id)

            state.totalQuantity++

            if (!existingCartItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingCartItem.quantity++;
                existingCartItem.totalPrice += newItem.price
            }

        },
        removeItemFromCart(state, action) {
            const id = action.payload
            const exisitingItem = state.items.find(item => item.id === id)
            state.totalQuantity--

            if (exisitingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                exisitingItem.quantity--;
            }
        },

    }
})

export const sendCartData = (cart) => {
    // returns a function [thunk]
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'sending',
            message: 'sending cart data',
        }))

        const sendRequest = async () => {
            const response = await fetch("https://authmaxmilum-default-rtdb.firebaseio.com/cart.json",
                {
                    method: 'PUT',
                    body: JSON.stringify(cart)
                })

            if (!response.ok) {
                throw new Error("sending cart data falid")
            }
        }

        try {
            await sendRequest()
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'sent cart data successfully',
            }))
        } catch (error) {
            sendCartData().catch(error => {
                dispatch(uiActions.showNotification({
                    status: 'error',
                    title: 'Error!',
                    message: 'sent cart data Faild',
                }))
            })
        }
    }
}


export const cartActions = cartSlice.actions;
export default cartSlice