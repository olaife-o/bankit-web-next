
import { configureStore } from '@reduxjs/toolkit'
import SigninSlice from '@/lib/features/signin/signinSlice'
import TokenSlice from '@/lib/features/token/tokenSlice'
import ProfileSlice from '@/lib/features/profile/profileSlice'
import { mutationApi } from '@/lib/api/mutationApi'
import { queryApi } from './api/queryApi'

export const makeStore = () => {
    return configureStore({
        reducer: {
            [mutationApi.reducerPath]: mutationApi.reducer,
            [queryApi.reducerPath]: queryApi.reducer,
            signin: SigninSlice,
            token: TokenSlice,
            profile: ProfileSlice,
        },
        middleware: (getDefaultMiddleware) => 
            getDefaultMiddleware().concat(mutationApi.middleware, queryApi.middleware)
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']