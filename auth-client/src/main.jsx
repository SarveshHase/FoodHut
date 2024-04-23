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
import Error from './components/admin_components/Error.jsx'
import AdminRoute from './pages/admin/AdminRoute.jsx'
import AddFood from './pages/admin/AddFood.jsx'
import { FoodProvider } from '../context/FoodContext.jsx'
import Menu from './pages/Menu.jsx'
import FoodDetails from './pages/FoodDetails.jsx'
import Profile from './pages/Profile.jsx'
import { CartProvider } from '../context/CartContext.jsx'
import ViewCart from './pages/ViewCart.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
      < Route path='/login' element={< Login />} />
      < Route path='/register' element={< Register />} />
      <Route path='/verifyOtp' element={<ProtectedRoute> <VerifyOtp /> </ProtectedRoute>} />
      < Route path='/error' element={< Error />} />
      <Route path='/admin/addFood' element={<ProtectedRoute><AdminRoute><AddFood /></AdminRoute></ProtectedRoute>} />
      < Route path='/menu' element={<ProtectedRoute> <Menu /> </ProtectedRoute>} />
      <Route path='/menu/:id' element={<ProtectedRoute> <FoodDetails /> </ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
      <Route path='/viewcart' element={<ProtectedRoute> <ViewCart /> </ProtectedRoute>} />
    </Route >
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <FoodProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </FoodProvider>
    </UserProvider>
  </React.StrictMode>,
)
