import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';



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

  const { displayName, email, password, onInputChange, formState, emailIsValid, passwordIsValid,
     displayNameIsValid, formValidation, formIsValid } = useForm(formData, formValidations)

 const onSubmit = (event) => {
  event. preventDefault();
  //console.log(formState)
 }

 //console.log('formIsValid...',formIsValid)

 console.log(!displayNameIsValid)
  return (
    <AuthLayout title="TESTING GIT">
      <h1>form { formIsValid ? 'Valido' : 'Incorrecto' }</h1>
      <form onSubmit={onSubmit}>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name='displayName'
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameIsValid}
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
                error={!!emailIsValid}
                helperText={emailIsValid}
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
                error={!!passwordIsValid}
                helperText={ passwordIsValid }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 }>
                <Button 
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
