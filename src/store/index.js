import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import {
   persistReducer,
   persistStore,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER
} from 'redux-persist'
import storage from './storage'
import userSlice from './slices/users'

const persistConfig = {
   key: 'next',
   version: 1,
   storage
}

const reducers = combineReducers({
   [userSlice.name]: userSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (defaultMiddleware) =>
      defaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
         }
      })
})

const makeStore = () => store

export const persistor = persistStore(store)
export const wrapper = createWrapper(makeStore)
