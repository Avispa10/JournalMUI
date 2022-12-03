import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async ( uid = '') => {
    if ( !uid ) throw new Error ( ' El UID del usuario no existe');

    const collectionRef = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`));

    console.log(collectionRef);

    const notes = [];
    collectionRef.forEach((doc) => {
      notes.push({id : doc.id, ...doc.data()})
    });
    console.log(notes);

    return notes;
}