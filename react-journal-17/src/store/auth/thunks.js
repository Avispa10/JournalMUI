import { signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, logout, login } from "./AuthSlice"


export const checkingAuthentication = ( email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleAuthentication = () => {
    return async ( dispatch ) => {
        dispatch(checkingCredentials())

        const result = await signInWithGoogle();

        if (!result.ok) { 
            console.log( result)
            return dispatch(logout(result.errorMessage) )
        }
        else {
            console.log( result)
            return dispatch(login(result))
        }

        
    }
}