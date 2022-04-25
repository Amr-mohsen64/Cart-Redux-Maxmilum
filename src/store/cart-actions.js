import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"

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

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch("https://authmaxmilum-default-rtdb.firebaseio.com/cart.json")

            if (!response.ok) {
                throw new Error("could not fetch data")
            }

            const data = await response.json()
            return data
        }

        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart(cartData))

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'fetching cart data faild',
            }))
        }
    }
}