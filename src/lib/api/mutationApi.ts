

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/store";

const baseUrl = "https://api.bankitafrica.com"
// const baseUrl = "https://api.staging.bankitafrica.com"

export const mutationApi = createApi({
    reducerPath: 'onboardingApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState
            const token = state.token
            headers.set("x-api-key", "aXA7DdqHKemWwXO5maT1hiLuWbOYTyFB")
            headers.set("Accept", "application/json")
            headers.set("Content-Type", "application/json")
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (body) => {
                return {
                    url: "auth/login",
                    method: "POST",
                    body,
                }
            },
        }),
        makeTransfer: builder.mutation({
            query: (body) => {
              return {
                url: "transfer",
                method: "POST",
                body,
              }
            },
        }),
    })
})

export const {
    useSigninMutation,
    useMakeTransferMutation,
} = mutationApi;