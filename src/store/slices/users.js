import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const userSlice = createSlice({
   name: 'users',
   initialState: {},
   reducers: {
      setEnt(state, action) {
         return action.payload
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

export default userSlice
