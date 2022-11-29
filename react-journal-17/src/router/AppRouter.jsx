import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { FirebaseAuth } from '../firebase/config';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { logout, login } from '../store/auth/AuthSlice';
import  CheckinAuth  from '../ui/components/CheckinAuth';


export const AppRouter = () => {

  const status = useCheckAuth()

  if ( status === 'checking') { 
    return <CheckinAuth/>
  }

  return (
    <Routes>

        {
          ( status === 'authenticated')
          ? <Route path="/*" element={ <JournalRoutes /> } /> 
          : <Route path="/auth/*" element={ <AuthRoutes /> } />
        }

        <Route path='/*' element={ <Navigate to='/auth/login'/>}/>

    </Routes>
  )
}
