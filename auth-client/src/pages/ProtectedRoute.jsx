import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/get-user`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const userData = res.data.data;
        // console.log(userData);
        setUser(userData);
      } catch (error) {
        console.log("Error in ProtectedRoute: ", error);
        navigate("/login");
      }
    };

    if (!user) {
      getUser();
    }
  }, [user, setUser, navigate]);

  if (!user) {
    // If user is not authenticated yet, return null or a loading indicator
    return null;
  }

  // If user is authenticated, render the children components
  return children;
}
