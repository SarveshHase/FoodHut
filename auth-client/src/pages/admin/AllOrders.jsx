import PropTypes from 'prop-types'
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../../context/UserContext';

function OrderItem({ order, onDelivered }) {
    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="grid grid-cols-3">
                    {order?.items?.map((item) => (
                        <div key={item.food._id} className='flex flex-col justify-between ml-4 flex-grow'>
                            <div>
                                <img className='h-20' src={item?.food?.foodImage} alt={item?.food?.name} />
                            </div>
                            <span className="font-bold text-sm ">{item?.food?.name}</span>
                            <span className="flex items-center space-x-4">
                                Qty:
                                <span className="text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium">
                                    {item?.qty}
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between w-1/5 cursor-pointer">
                <span className={`font-bold text-sm ${order?.payment ? 'text-green-600' : ''}`}>
                    {order?.payment ? 'Paid' : 'Not Paid'}
                </span>
            </div>

            <div className="flex justify-center w-1/5 cursor-pointer">
                <span className="font-bold text-sm">{order?.status}</span>
            </div>

            <div className="flex justify-center w-1/5 cursor-pointer">
                <button
                    className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center'
                    onClick={() => onDelivered(order?._id)}
                    disabled={order?.status === 'Delivered'}
                >
                    Delivered
                </button>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">
                ₹{order?.totalAmount}
            </span>
        </div>
    )
}

OrderItem.propTypes = {
    order: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.shape({
            food: PropTypes.shape({
                _id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                foodImage: PropTypes.string.isRequired
            }),
            qty: PropTypes.number.isRequired
        })),
        payment: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        totalAmount: PropTypes.number.isRequired
    }).isRequired,
    onDelivered: PropTypes.func.isRequired
}

function AllOrders() {
    const [orders, setOrders] = useState([]);
    const { user } = useUserContext();

    const fetchOrders = useCallback(async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/order/getorders`,
                { userId: user?.user?._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (res.data.success) {
                setOrders(res.data.data.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders");
        }
    }, [user]);

    const handleDelivered = async (orderId) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/order/delivered`,
                {
                    orderId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (res.data.success) {
                toast.success("Order marked as delivered");
                fetchOrders(); // Refresh orders after update
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error marking order as delivered:", error);
            toast.error("Failed to update order status");
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">All Orders</h2>
            {orders.map((order) => (
                <OrderItem
                    key={order._id}
                    order={order}
                    onDelivered={handleDelivered}
                />
            ))}
            <ToastContainer />
        </div>
    );
}

export default AllOrders;