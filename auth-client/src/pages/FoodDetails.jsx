import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import PageNavigation from '../components/PageNavigation'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useCartContext } from '../../context/CartContext'
import { toast } from 'react-toastify'

function FoodDetails() {
    const params = useParams()
    const [foodDetails, setFoodDetails] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const { addToCart, removeItem, cartItems } = useCartContext()

    const getFoodDetails = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/food/food/${params.id}`)
            if (res.data.success) {
                setFoodDetails(res.data.data.foodItems)
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch food details");
        }
    }, [params.id]);

    useEffect(() => {
        getFoodDetails()
    }, [getFoodDetails]);

    if (!foodDetails) {
        return <div className="pt-[16vh] text-center">Loading...</div>
    }

    const isInCart = cartItems.some(item => item._id === foodDetails._id);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleCartAction = () => {
        if (isInCart) {
            removeItem(foodDetails);
            toast.success("Removed from cart!");
        } else {
            const item = {
                ...foodDetails,
                qty: quantity
            };
            addToCart(item);
            toast.success("Added to cart!");
        }
    };

    const handleFavorite = () => {
        // Implement favorite functionality here
        toast.info("Favorite feature coming soon!");
    };

    return (
        <div className="pt-[16vh]">
            <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
                <div className="container mx-auto">
                    <PageNavigation title={foodDetails.name} />
                    <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8">
                        <div className="bg-red-200/[0.3] border rounded-md mb-5 p-4 flex items-center justify-center">
                            <img
                                src={foodDetails?.foodImage}
                                alt={foodDetails?.name}
                                className='w-full h-auto max-h-[500px] object-contain'
                            />
                        </div>

                        <div className="bg-red-200/[0.3] border rounded p-8 text-black mb-5">
                            <h1 className="text-3xl mb-4 font-bold text-[#f54748]">
                                {foodDetails?.name}
                            </h1>
                            <div className="text-2xl mb-4 font-bold text-yellow-500">
                                Price: <span>₹{foodDetails?.price}</span>
                            </div>
                            <div className="text-lg text-justify text-black mb-8 min-h-[100px]">
                                {foodDetails?.description}
                            </div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="text-2xl font-bold text-[#f54748]">
                                    Quantity
                                </div>
                                <div className="flex items-center space-x-4">
                                    <button
                                        className="bg-red-500 hover:bg-red-600 relative p-4 rounded-full text-white cursor-pointer"
                                        onClick={() => handleQuantity("dec")}
                                    >
                                        <AiOutlineMinus className='font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                                    </button>
                                    <span className='text-red-500 px-6 py-2 bg-slate-50 text-lg font-medium min-w-[50px] text-center'>
                                        {quantity}
                                    </span>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 relative p-4 rounded-full text-white cursor-pointer"
                                        onClick={() => handleQuantity("inc")}
                                    >
                                        <AiOutlinePlus className='font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
                                <button
                                    onClick={handleCartAction}
                                    className={`w-full sm:w-auto active:scale-90 transition duration-200 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium ${isInCart
                                        ? 'bg-white text-[#f54748] border-2 border-[#f54748]'
                                        : 'bg-[#f54748] text-white'
                                        }`}
                                >
                                    {isInCart ? 'Remove from Cart' : 'Add To Cart'}
                                </button>
                                <button
                                    onClick={handleFavorite}
                                    className='bg-white w-full sm:w-auto active:scale-90 transition duration-200 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-[#f54748] border-2 border-[#f54748]'
                                >
                                    Favourite
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-14">
                        <div className="bg-[#f54748] py-4 text-center text-white font-semibold rounded-lg">
                            Weight: {foodDetails?.weight}g
                        </div>
                        <div className="bg-[#f54748] py-4 text-center text-white font-semibold rounded-lg">
                            Category: {foodDetails?.category}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodDetails