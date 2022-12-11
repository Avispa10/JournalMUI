import { configureStore } from '@reduxjs/toolkit'
import { AuthSlice } from './auth/AuthSlice'
import { JournalSlice } from './journal/JournalSlice'

 export default configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    journal: JournalSlice.reducer,
  },
}) 
