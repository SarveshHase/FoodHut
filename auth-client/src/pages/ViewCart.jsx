import React from 'react'
import { useCartContext } from '../../context/CartContext'
import CartFood from '../components/CartFood'
import { Link } from 'react-router-dom'

function ViewCart() {
    const { cartItems, addToCart, removeItem } = useCartContext()
    const itemsPrice = cartItems.reduce((a, c) => a + (c.qty * c.price), 0)
    const taxPrice = (itemsPrice * 0.14).toFixed(3);
    const totalPrice = itemsPrice + parseInt(taxPrice);
    return (
        <div className="pt-14">
            <div className={cartItems?.length === 0 ? "bg-gray-100 h-96" : "bg-gray-100"}>
                <div className="container mx-auto py-6">
                    <div className="w-full bg-white px-10 py-5 text-black rounded-md">
                        <div className="flex justify-between border-b pb-8">
                            <h1 className="font-semibold text-2xl">
                                My Food Cart
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
                            cartItems?.map((food) => {
                                return (
                                    <CartFood key={food._id} food={food} />
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
    )
}

export default ViewCart

