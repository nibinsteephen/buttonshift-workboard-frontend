import React from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
    const { isAuthenticated } = useAuthStore(); 

  return (
    isAuthenticated ? children : <Navigate to="/login" />
  )
}

export default PrivateRoute
