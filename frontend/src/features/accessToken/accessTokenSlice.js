import { createSlice } from "@reduxjs/toolkit";

export const accessTokenSlice = createSlice({
    name: 'accessToken',
    initialState: {
        value: ''
    },
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { change } = accessTokenSlice.actions
export const selectAccessToken = state => state.accessToken.value
export default accessTokenSlice.reducer