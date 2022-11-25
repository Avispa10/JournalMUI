import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState: {
        status: 'no-authenticated',
        uid: null,
        email: null,
        diplayName: null,
        photoURL: null,
        errorMessage: null,
    },
     reducers: {
         login: (state, { payload} ) => {
            state.status = 'authenticated',
            state.uid = payload.uid,
            state.email = payload.email,
            state.diplayName = payload.displayName,
            state.photoURL = payload.photoURL,
            state.errorMessage = null;
         },

         logout: ( state, { payload })=> {
            state.status = 'not-authenticated',
            state.uid = null,
            state.email = null,
            state.diplayName = null,
            state.photoURL = null,
            state.errorMessage = payload

            console.log( payload);
         },
         checkingCredentials: (state) => {
            state.status = 'checking'
         }
    }
});


//  Action creators are generated  for  each  case reducer function
export const { login, logout, checkingCredentials} = AuthSlice.actions;