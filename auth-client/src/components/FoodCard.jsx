import React from 'react';
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import LoadingBar from 'react-top-loading-bar'
import { useLoaderContext } from '../../context/Loadercontext';

function FoodCard({ currEle }) {
    const { cartItems, addToCart, removeItem } = useCartContext();
    const { manageProgress } = useLoaderContext();

    // Helper function to check if item is in cart
    const isInCart = (item) => {
        return cartItems.some(cartItem => cartItem._id === item._id);
    };

    // Toggle add or remove from cart
    const toggleCartItem = (item) => {
        manageProgress();
        if (isInCart(item)) {
            removeItem(item);
        } else {
            addToCart(item);
        }
    };

    return (
        <div className="food-card bg-red-500/10 rounded-xl flex flex-col justify-between cursor-pointer items-center p-5">
            <div className="relative mb-3">
                <Link to={`/menu/${currEle?._id}`}>
                    <img src={currEle?.foodImage} alt="" />
                </Link>
                <div className="absolute top-2 left-2">
                    <button className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative">
                        <FaHeart className='absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                    </button>
                </div>

                <div className="absolute bottom-2 right-2">
                    <button className="shadow-sm text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative">
                        <div className="absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "><span>&#8377;</span>{currEle.price}</div>
                    </button>
                </div>
            </div>
            <div>
                <div className="flex gap-4 items-center">
                    <p className="text-xl text-bold text-[#f54748]">
                        {currEle.name}
                    </p>
                    <div className="flex flex-sm space-x-2 cursor-pointer">
                        <span className="font-normal text-[#fdc55e]">4.3</span>
                        <FaStar className='text-[#fdc55e]' size={16} />
                        <span className="font-medium">({currEle?.reviews.length})</span>
                    </div>
                </div>

                <button className="bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" onClick={() => toggleCartItem(currEle)}>
                    {isInCart(currEle) ? 'Remove From Cart' : 'Add To Cart'}
                </button>
            </div>
        </div>
    )
}

export default FoodCard;
