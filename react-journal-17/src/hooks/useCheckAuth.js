import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/AuthSlice";


export const useCheckAuth = () => {

  const {status} = useSelector( state => state.auth);

  const dispatch = useDispatch()

  useEffect(() => {
    
      onAuthStateChanged( FirebaseAuth, ( user ) => {
      console.log( user );

      
      if ( !user ) { 
        return dispatch (logout())}

      const { email, displayName, photoURL, uid} = user

      dispatch(login( { email, displayName, photoURL, uid }))
      })

  
  }, [])

  return status
}
