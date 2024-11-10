

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/lib/store";

const baseUrl = "https://api.bankitafrica.com"
// const baseUrl = "https://api.staging.bankitafrica.com"

export const queryApi = createApi({
    reducerPath: 'queryApi',
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
        getProfile: builder.query({
            query: () => ({
                url: "user",
            }),
        }),
        getAccount: builder.query({
            query: () => ({
              url: "bank-account",
            }),
        }),
        getBeneficiaries: builder.query({
            query: () => ({
                url: "transaction/beneficiary/fetch/all",
            }),
        }),
        getTxHistory: builder.query({
            query: ({ total, last }) => ({
              url: `transaction/fetch?result_per_page=${total}&last_record_index=${last}`,
            }),
        }),
        getBanksList: builder.query({
            query: () => ({
                url: "bank/list",
            }),
        }),
        getBankAccountDetails: builder.query({
            query: ({ account_number, code }) => ({
                url: `bank/search-name?account_number=${account_number}&code=${code}`
            }),
        }),
        getBankitAccountDetails: builder.query({
            query: ({ username }) => ({
                url: `/bank/account/details?username=${username}`
            }),
        }),
    })
})

export const {
    useGetProfileQuery,
    useGetBeneficiariesQuery,
    useGetTxHistoryQuery,
    useGetAccountQuery,
    useGetBanksListQuery,
    useGetBankAccountDetailsQuery,
    useGetBankitAccountDetailsQuery,
} = queryApi;