"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<any>) => {
            return action.payload
        },
        setBeneficiaries: (state, action: PayloadAction<any>) => {
            return { ...state, "beneficiaries": action.payload }
        },
        setTransactions: (state, action: PayloadAction<any>) => {
            return { ...state, "transactions": action.payload }
        },
        setAccountDetails: (state, action: PayloadAction<any>) => {
            return { ...state, "accountDetails": action.payload }
        },
        clearProfile: () => {
            return {}
        }
    }
})

const { reducer, actions } = profileSlice
export const { setProfile, clearProfile, setAccountDetails, setBeneficiaries, setTransactions } = actions
export default reducer