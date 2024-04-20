import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { UserProvider } from '../context/UserContext.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx'
import VerifyOtp from './pages/VerifyOtp.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      < Route path='/login' element={< Login />} />
      < Route path='/register' element={< Register />} />
      <Route path='/verifyOtp' element={<ProtectedRoute> <VerifyOtp /> </ProtectedRoute>} />
      {/* <Route path='/addFood' element={<ProtectedRoute> <AddFood /> </ProtectedRoute>} /> */}
    </Route >
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
