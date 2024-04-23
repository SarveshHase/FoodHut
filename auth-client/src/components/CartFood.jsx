import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useCartContext } from '../../context/CartContext';

function CartFood({ food }) {
    const { cartItems, removeItem, addToCart } = useCartContext();
    
    // console.log("Food: ", food);

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div className="flex w-2/5">
                <div className="w-20">
                    <img src={food?.foodImage} alt="" className='h-20' />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow ">
                    <span className="font-bold text-sm">
                        {food.name}
                    </span>
                    <span className="flex items-center space-x-4">
                        <div className="shadow-sm text-white bg-red-500 hover:bg-red-600 active:bg-red-800 cursor-pointer p-4 rounded-full relative" onClick={() => removeItem(food)}>
                            <AiOutlineMinus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
                        </div>
                        <span className="text-red-500 px-3 py-2 bg-slate-100 text-lg font-medium">
                            {food.qty}
                        </span>
                        <div className="shadow-sm text-white bg-red-500 hover:bg-red-600 active:bg-red-800  cursor-pointer p-4 rounded-full relative" onClick={() => addToCart(food)}>
                            <AiOutlinePlus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ' />
                        </div>
                    </span>
                </div>
            </div>


            <div className="flex justify-center w-1/5 cursor-pointer">
                <span className="font-bold text-sm">
                    {
                        food?.category
                    }
                </span>
            </div>
            <span className="font-bold text-center w-1/5 text-sm">
                {food?.price} X {food?.qty}
            </span>
            <span className="font-bold text-center w-1/5 text-sm">
                <span>&#8377;</span>{food?.price * food?.qty}
            </span>
        </div>
    )
}

export default CartFood