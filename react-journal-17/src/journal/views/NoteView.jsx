import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Alert, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ImageGallery } from '../components'
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo, useState } from 'react';
import { setActiveNote } from '../../store/journal/JournalSlice';
import { startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import { useRef } from 'react';


export const NoteView = () => {

   const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );
   const dispatch = useDispatch();

   console.log( note );
   const { body, title, date, onInputChange, formState} = useForm( note )

   const dateString = useMemo( () => {
    const newDate = new Date( date );
    return newDate.toUTCString();
   }, [date])

   useEffect(() => {
     dispatch(setActiveNote(formState))

   }, [formState])

   const onClickSave = () => {
      dispatch(startSaveNote());
   }

   useEffect(()=> {

    if ( messageSaved.length > 1 ) {
        alert( messageSaved )
    }

   }),[ messageSaved ]

   const fileInputRef = useRef();

   const onFileInputChange = ( { target }) => {

    if ( target.files.length === 0 ) return;
    
    console.log(target.files.length)

    dispatch(startUploadingFiles(target.files))

   }


   

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }} className='container animate__animated animate__fadeIn animate__faster'>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>
            <input
            type='file'
            multiple
            onChange={ onFileInputChange}
            style={{ display: 'none'}}
            ref={ fileInputRef }
            />

            <IconButton 
                color='primary'
                disabled={isSaving}
                onClick= { () => fileInputRef.current.click()}
            >
                <UploadOutlined/>
            </IconButton>


            <Button
                onClick={ onClickSave} 
                color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                name='title'
                value={title}
                sx={{ border: 'none', mb: 1 }}
                onChange={onInputChange}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        {/* Image gallery */}
        <ImageGallery />

    </Grid>
  )
}
