import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { api } from '../api/api'
import fileSlice from '../api/FileSlice/fileSlice'

const root = combineReducers({
    fileSlice: fileSlice,
    [api.reducerPath]: api.reducer
})

const store = configureStore({
    reducer: root,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(api.middleware)
    }
})

export default store