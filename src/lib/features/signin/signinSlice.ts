"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {}

const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setSignin: (state, action: PayloadAction<any>) => {
            return action.payload
        },
        clearSignin: () => {
            return {}
        }
    }
})

const { reducer, actions } = signinSlice
export const { setSignin, clearSignin } = actions
export default reducer