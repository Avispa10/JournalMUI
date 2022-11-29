import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUser } from '../../store/auth/thunks';
import { useMemo } from 'react';



const formData = { 
  displayName: '',
  email: '',
  password: '', 
  
}

const formValidations = {
  displayName: [ (value) => value.length >= 3 , 'el nombre no puede quedar vacio' ],
  email: [ (value) => value.includes('@'), 'El email debe contener @' ],
  password: [ (value) => value.toString().length >= 6 , 'El password debe de contener mas de 6 letras' ],
}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const { displayName, email, password, onInputChange, formState, emailIsValid, passwordIsValid,
     displayNameIsValid, formValidation, formIsValid } = useForm(formData, formValidations)


  const [formSubmitted, setformSubmitted] = useState(false);

  const stateAuth = useSelector( state => state.auth);

 const isCheckingAuth = useMemo( () => stateAuth.status === 'checking')


 const onSubmit = (event) => {

  event. preventDefault();
  setformSubmitted(true);

  if(!formIsValid) return;

  dispatch(startCreatingUser(formState))

  
  console.log(formState)
 }

 //console.log('formIsValid...',formIsValid)


// console.log(displayNameIsValid)
  return (
    <AuthLayout title="Crear Cuenta">
      <h1>form { formIsValid ? 'Valido' : 'Incorrecto' }</h1>
      <form onSubmit={onSubmit} className='container animate__animated animate__fadeIn animate__faster'>
          <Grid container >
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error={(!!displayNameIsValid) && formSubmitted}
                helperText= { displayNameIsValid}
                
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
                error={!!emailIsValid && formSubmitted}
                //helperText={emailIsValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
                error={(!!passwordIsValid) && formSubmitted}
                helperText={ passwordIsValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>


              <Grid item xs={ 12 } display= { !stateAuth.errorMessage ? 'none' : '' }>
                <Alert severity="error">{stateAuth.errorMessage}</Alert>
              </Grid>
              <Grid item xs={ 12 }>
                <Button
                  disabled={ isCheckingAuth }
                  type = 'submit'
                  variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>


            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link>
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
