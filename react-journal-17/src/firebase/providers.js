import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";



const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
})

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
       // const credentials = GoogleAuthProvider.credentialFromResult(result);
       const { displayName, email, photoURL, uid } = result.user;

       return {
        ok: true,
        displayName, email, photoURL, uid
       }
     

    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    // The email of the user's account used.
        const email = error.customData.email;
    // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {
        ok: false,
        errorMessage,
        errorCode,
        }
    }
}

export const registerUserWithEmailPassword = async ( { email, password, displayName }) => {
    try {
       const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
       const { uid, photoURL} = res.user;

       console.log(res)


       //TODO actualizar el displayName en Firebase
       //firebase para saber cual es el usuario actual
       await updateProfile(FirebaseAuth.currentUser, { displayName })
       console.log('response from create Userwith...', res);


       return {
        ok: true,
        uid,
        photoURL,
        email,
        displayName,
       }
    }

    catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(error);
        return { ok : false, errorMessage} 
    }
}

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
       const res = await signInWithEmailAndPassword(FirebaseAuth, email, password)

       console.log(res.user);

       const { photoURL, uid , displayName} = res.user;

       return {
        ok: true,
        uid,
        photoURL,
        email,
        displayName
       }


    } catch (error) {
        console.log(error.message)

        return {
            ok: false,
            errorMessage: error.message
        }
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}