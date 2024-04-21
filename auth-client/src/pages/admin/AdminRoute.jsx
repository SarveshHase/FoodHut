import React from 'react'
import { useUserContext } from '../../../context/UserContext'
import { Navigate } from 'react-router-dom'


function AdminRoute({ children }) {
  const { user } = useUserContext()
  if (user != null) {
    return (user?.user?.role === "admin") ? (children) : <Navigate to="/error" />
  }

  return (<Navigate to="/login" />)
}

export default AdminRoute