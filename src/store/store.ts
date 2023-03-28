import {configureStore} from '@reduxjs/toolkit'
import themeReducer from "./themeReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
// ...

export const store = configureStore({
    reducer: {
        theme: themeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector