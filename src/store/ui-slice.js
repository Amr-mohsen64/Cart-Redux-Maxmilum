import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { cartIsVisble: true },
    reducers: {
        toggle(state) {
            state.cartIsVisble = !state.cartIsVisble
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice