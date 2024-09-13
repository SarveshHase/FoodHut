import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CartContext'
import { useUserContext } from '../../context/UserContext'
import axios from 'axios'

function MyOrder() {
    const { cartItems, addToCart, removeItem } = useCartContext()
    const { user, setUser } = useUserContext();
    const [orders, setOrders] = useState([]);
    const itemsPrice = cartItems.reduce((a, c) => a + (c.qty * c.price), 0)
    const taxPrice = (itemsPrice * 0.14).toFixed(3);
    const totalPrice = itemsPrice + parseInt(taxPrice);

    const getMyOrder = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/order/getorder`, {
                userId: user?.user?._id,
                token: localStorage.getItem("token")
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if (res.data.success) {
                setOrders(res.data.data.orders)
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("Error in MyOrder file: ", error);
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getMyOrder
    }, [])

    console.log("Orders:", orders);

    return (
        <div className="">
            <div className="pt-14">
                <div className={cartItems?.length === 0 ? "bg-gray-100 h-96" : "bg-gray-100"}>
                    <div className="container mx-auto py-6">
                        <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                            <div className="flex justify-between border-b pb-8">
                                <h1 className="font-semibold text-2xl">
                                    My Orders
                                </h1>
                                <h2 className="font-semibold text-2xl">
                                    {cartItems?.length || 0}
                                </h2>
                            </div>
                            <div className="mt-10 flex mb-5">
                                <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                                    Food Details
                                </h3>
                                <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                                    Category
                                </h3>
                                <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                                    Price
                                </h3>
                                <h3 className="font-semibold text-gray-900 text-xs uppercase w-2/5">
                                    Total Price
                                </h3>
                            </div>

                            {
                                orders?.map((order) => {
                                    return (
                                        <FoodCart key={order._id} food={order} />
                                    )
                                })
                            }

                            <div className={
                                cartItems.length === 0 ? "mx-auto hidden items-end justify-center px-6 flex-col" :
                                    "mx-auto justify-center px-6 flex-col"
                            }>
                                <div className="text-right mb-2 font-semibold text-red-900 ">
                                    Total Price: <span>&#8377;</span>{totalPrice}
                                </div>
                                <Link to="/order"><button className="btn text-right text-white hover:bg-red-600 hover:border-red-500 btn-sm bg-red-500">
                                    Check Out
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyOrder


function FoodCart({ food }) {
    const { cartItems, removeItem, addToCart } = useCartContext();

    // console.log("Food: ", food);

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="grid grid-cols-3">
                    {
                        food?.items?.map((item) => <>
                            <div className="flex flex-col justify-between ml-4 flex-grow">
                                <div>
                                    <img src={item?.food.foodImage} alt="" />
                                </div>
                                <span className="font-bold text-sm">
                                    {item?.food?.name}
                                </span>
                                <span className="flex items-center space-x-4">
                                    Qty: <span className="text-red-500 px-3 py-2 bg-slate-500 text-lg font-medium">{item?.qty}</span>
                                </span>
                            </div>
                        </>)
                    }
                    <img src={food?.foodImage} alt="" className='h-20' />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow ">
                    <span className="font-bold text-sm">
                        {food.name}
                    </span>
                    <span className="flex items-center space-x-4">
                        {/* <div className="shadow-sm text-white bg-red-500 hover:bg-red-600 active:bg-red-800 cursor-pointer p-4 rounded-full relative" onClick={() => removeItem(food)}>
                            <AiOutlineMinus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
                        </div>
                        <span className="text-red-500 px-3 py-2 bg-slate-100 text-lg font-medium">
                            {food.qty}
                        </span>
                        <div className="shadow-sm text-white bg-red-500 hover:bg-red-600 active:bg-red-800  cursor-pointer p-4 rounded-full relative" onClick={() => addToCart(food)}>
                            <AiOutlinePlus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
                        </div> */}
                    </span>
                </div>
            </div>


            <div className="flex justify-center w-1/5 cursor-pointer">
                {
                    food?.payment === false && <span className='font-bold text-sm'>Not paid</span>
                }
                {
                    food?.payment && <span className='font-bold text-green-600 text-sm'>Paid</span>
                }
            </div>
            <div className="flex justify-center w-1/5 cursor-pointer">
                <span className='font-bold text-sm'>{food?.status}</span>
            </div>
            <span className="font-bold text-center w-1/5 text-sm">
                {food?.createdAt}
            </span>
            <span className="font-bold text-center w-1/5 text-sm">
                <span>&#8377;</span>{food?.totalAmount}
            </span>
        </div>
    )
}