import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartContext } from '../../context/CartContext';
import { useUserContext } from '../../context/UserContext.jsx';
import {
    useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Order() {
    const navigate = useNavigate()
    const { cartItems, setCartItems } = useCartContext()
    const { user } = useUserContext()
    const [isLoading, setIsLoading] = useState(false)
    const [scriptLoaded, setScriptLoaded] = useState(false)

    useEffect(() => {
        console.log("Current user state:", user);
    }, [user]);

    const itemsPrice = cartItems.reduce((a, c) => a + (c.qty * c.price), 0)
    const taxPrice = (itemsPrice * 0.14).toFixed(3);
    const totalPrice = itemsPrice + parseInt(taxPrice);

    const stripe = useStripe()

    const handlePayment = async () => {
        try {
            console.log("1. Payment button clicked");
            setIsLoading(true);

            if (!user) {
                console.error("3a. User object is null or undefined");
                toast.error("Please login to continue");
                navigate('/login');
                return;
            }

            if (!user._id) {
                console.error("3b. User ID is missing", user);
                toast.error("User session is invalid. Please login again");
                navigate('/login');
                return;
            }

            console.log("3c. User authenticated:", {
                userId: user._id,
                name: user.name,
                email: user.email
            });

            if (!stripe) {
                console.error('Stripe is not initialized.');
                toast.error("Stripe not initialized. Please try again.");
                return;
            }

            const orderItems = cartItems.map((item) => (
                {
                    food: item._id,
                    qty: item.qty
                }
            ))
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/order/order`, {
                user: user?.user?._id,
                items: orderItems,
                totalAmount: totalPrice,
                token: localStorage.getItem("token")
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (res.data.success) {
                await stripe.redirectToCheckout({
                    sessionId: res.data.data.sessionId
                }).catch(err => {
                    toast.error("Payment redirect failed: " + err.message);
                });
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error in payment:", error);
            console.error("Error details:", {
                message: error.message,
                response: error.response?.data,
                user: user
            });
            toast.error(error.response?.data?.message || "Payment failed");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!user || !user._id) {
            toast.error("Please login to access orders");
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="h-screen pt-[16vh]">
            <div className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-[28rem] mx-auto flex flex-col items-center rounded-md px-8 py-5">
                <NavLink to='/'>
                    <img src={logo} alt="" className='logo mb-6 cursor-pointer text-center' />
                </NavLink>
                <div className="text-xl text-[#2e2e2e] mb-3">
                    Items Price: <span className='text-[#f54748]'><span>&#8377;</span>{itemsPrice}</span>
                </div>
                <div className="text-xl text-[#2e2e2e] mb-3">
                    Tax Price: <span className='text-[#f54748]'><span>&#8377;</span>{taxPrice}</span>
                </div>
                <div className="text-xl text-[#2e2e2e] mb-3">
                    Total Price: <span className='text-[#f54748]'><span>&#8377;</span>{totalPrice}</span>
                </div>
                <Link className="bg-red-600 active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center" type='submit' onClick={handlePayment}>Pay <span>&#8377;</span>{totalPrice}</Link>

                <ToastContainer />
            </div>
        </div>
    )
}

export default Order