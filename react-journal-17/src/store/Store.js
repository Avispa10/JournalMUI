import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './auth/AuthSlice'

 export default configureStore({
  reducer: {
    auth: AuthSlice.reducer
  },
}) 
