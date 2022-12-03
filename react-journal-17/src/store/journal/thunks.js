import { async } from "@firebase/util";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./JournalSlice";

export const startNewNote =  () => {
    return async ( dispatch, getState ) => {

        dispatch(savingNewNote(true))
        
        console.log('startNewNote');
        console.log(getState());

        const { uid } = getState().auth;

        console.log(uid);

        const newNote = {
            title: 'joya',
            body: 'joyabody',
            date: new Date().getTime(),
            imageUrls:[],
        }
        
        try {
            const docRef = await addDoc(collection(FirebaseDB, `${uid}/journal/notes`), newNote );
            console.log("Document written with ID: ", docRef);

            newNote.id = docRef.id

        
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

    }

}

export const startLoadingNotes = ( uid ) => {
    return async ( dispatch, getState ) => {

         const notesLoaded = await loadNotes( uid );

         dispatch(setNotes(notesLoaded))
    } 
}

export const startSaveNote = () => {
    return async( dispatch, getState) => {

        dispatch(setSaving())
        const { uid } = getState().auth;
        const { active : note } = getState().journal;

        const noteToFirestore = { ...note };

        delete noteToFirestore.id

        console.log(noteToFirestore)

        // Add a new document in collection "notes"
        await setDoc(doc(FirebaseDB, `${ uid }/journal/notes/${note.id}`), noteToFirestore, { merge: true});

        dispatch(updateNote(note))

    }
}

export const startUploadingFiles = ( files = []) => {

    return async ( dispatch, getState ) => {

        dispatch(setSaving);

        console.log( files );

        await fileUpload( files[0])
    }
}
