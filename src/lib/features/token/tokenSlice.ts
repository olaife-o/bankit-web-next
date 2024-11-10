"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = null

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<any>) => {
            return action.payload
        },
        clearToken: () => {
            return null
        }
    }
})

const { reducer, actions } = tokenSlice
export const { setToken, clearToken } = actions
export default reducer