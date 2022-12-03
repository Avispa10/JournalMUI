import { createSlice } from '@reduxjs/toolkit';
import { startNewNote } from './thunks';

export const JournalSlice = createSlice({
    name: 'Journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        /* active: {
            id: 'ABC123',
            title: '',
            body: '',
            date: 1234567,
            imageUrls: [],

        } */
    },
     reducers: {

        savingNewNote: (state, action) => {
            state.isSaving = action.payload;
        },
         addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
         },
         setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
         },
         setNotes: (state, action) => {
            state.notes = action.payload; 
        },
        setSaving: (state, action) => {
            state.isSaving= true;
            state.messageSaved = '';
            //todo error
        },
        updateNote: (state, { payload }) => {
            state.isSaving= false;
            state.notes = state.notes.map( note => {
                console.log(payload)
                if ( payload.id === note.id ) {
                    return payload
                } else return note;

            } );
            state.messageSaved= `${payload.title}  is saved!`
        },
        deleteNoteById: (state, action) => {
            
        },
    }
});


//  Action creators are generated  for  each  case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote } = JournalSlice.actions;