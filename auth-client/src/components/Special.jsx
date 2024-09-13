import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useFoodContext } from '../../context/FoodContext';
import axios from 'axios';
import FoodCard from './FoodCard';

function Special() {

    const [specialFood, setSpecialFood] = useState([])
    const { food, setFood } = useFoodContext()

    const getSpecialFoods = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/food/specialFoods`)

            if (res.data.success) {
                setSpecialFood(res.data.data.foodItems)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSpecialFoods()
    }, [specialFood])

    return (
        <div className="py-3 px-10 sm:px-4 md:px-6">
            <div className="container mx-auto py-[2vh]">
                <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
                    Special <span className="text-[#f54748]">Foods</span>
                </div>
                <div className="grid gap-8 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    {
                        specialFood?.map(currELe => <FoodCard key={currELe?._id} currEle={currELe} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Special