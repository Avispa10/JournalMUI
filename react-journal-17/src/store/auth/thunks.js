import { async } from "@firebase/util"
import { registerUserWithEmailPassword, signInWithGoogle, loginWithEmailPassword, logoutFirebase } from "../../firebase/providers"
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

export const startCreatingUser = ({email, password, displayName}) => {
    return async ( dispatch ) => {
        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});

        if ( !ok ) { dispatch(logout( errorMessage))  }
        else {
            dispatch( login({ uid, photoURL, email, displayName }));
        }

        console.log(ok, errorMessage)
       
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {

    return async ( dispatch) => {
        console.log(email, password)
        const { ok, uid, photoURL, errorMessage, displayName} = await loginWithEmailPassword({ email, password})

        if (ok) { dispatch(login({uid, photoURL, email, displayName }))}
        else { dispatch(logout( errorMessage ))}

        console.log(ok, errorMessage)
        
    }

}

export const startLogout = () => {
    return async( dispatch ) => {
        //dispatch(checkingCredentials())

        await logoutFirebase();

        dispatch(logout());

    }
}