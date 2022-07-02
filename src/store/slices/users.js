import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const userSlice = createSlice({
   name: 'users',
   initialState: {
      isAuth: false,
      token: '',
      data: {}
   },
   reducers: {
      login(state, actions) {
         return {
            ...state,
            isAuth: true,
            token: actions.payload
         }
      },
      addUsers(state, actions) {
         return {
            ...state,
            data: actions.payload
         }
      }
   },
   extraReducers: {
      [HYDRATE]: (state, action) => {
         console.log('HYDRATE', state, action.payload)
         return {
            ...state,
            ...action.payload.users
         }
      }
   }
})

export const { login, addUsers } = userSlice.actions
export default userSlice
