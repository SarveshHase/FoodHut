import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCartContext } from '../../context/CartContext';
import { useUserContext } from '../../context/UserContext';
import {
    useStripe,
} from '@stripe/react-stripe-js';
import axios from 'axios';

function Order() {
    const { cartItems, addToCart, removeItem } = useCartContext()
    const itemsPrice = cartItems.reduce((a, c) => a + (c.qty * c.price), 0)
    const taxPrice = (itemsPrice * 0.14).toFixed(3);
    const totalPrice = itemsPrice + parseInt(taxPrice);

    const { user } = useUserContext();
    const stripe = useStripe()

    const handleFinish = async () => {
        try {
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
                const result = await stripe.redirectToCheckout({
                    sessionId: res.data.data.sessionId
                })
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

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
                <Link className="bg-red-600 active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center" type='submit' onClick={handleFinish}>Pay <span>&#8377;</span>{totalPrice}</Link>

                <ToastContainer />
            </div>
        </div>
    )
}

export default Order