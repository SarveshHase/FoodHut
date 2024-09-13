import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllOrders() {
    const [orde, setorder] = useState(second)
}

function OrderFoods() {
    const handleDelivered = async (id) => {
        try {
            console.log(id);
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/order/status`, {
                userId: user?.user?._id,
                orderId: id,
                token: localStorage.getItem("token")
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="grid grid-cols-3">
                    {
                        order?.items?.map((item) => <div className='flex flex-col justify-between ml-4 flex-grow'>
                            <div>
                                <img className='h-20' src={item?.food?.foodImage} />
                            </div>
                            <span className="font-bold text-sm ">{item?.food?.name}</span>
                            <span className="flex items-center space-x-4">
                                Qty:
                                <span className="text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium">
                                    {item?.qty}
                                </span>
                            </span>
                        </div>)
                    }
                </div>
            </div>

            <div className="flex justify-between w-1/5 cursor-pointer">
                {
                    order?.payment === false && <span className="font-bold text-sm ">Not Paid</span>
                }
                {
                    order?.payment && <span className="font-bold text-green-600 text-sm ">Not Paid</span>
                }
            </div>

            <div className="flex justify-center w-1/5 cursor-pointer">
                <span className="font-bold text-sm">{order?.status}</span>
            </div>

            <div className="flex justify-center w-1/5 cursor-pointer">
                <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center' onClick={() => handleDelivered(order?._id)}>Delivered</button>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">
                {
                    order?.totalAmount
                }
            </span>
            <ToastContainer />
        </div>
    )
}

export default AllOrders