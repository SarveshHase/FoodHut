import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useFoodContext } from '../../context/FoodContext';
import axios from 'axios';
import FoodCard from './FoodCard';

function RecommendedFood() {
    const [ratedFood, setRatedFood] = useState([])
    const { food, setFood } = useFoodContext()

    const getRatedFoods = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/food/getTopRated`)

            if (res.data.success) {
                setRatedFood(res.data.data.foodItems)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getRatedFoods()
    }, [ratedFood])
    return (
        <div className="py-3 px-10 sm:px-4 md:px-6">
            <div className="container mx-auto py-[2vh]">
                <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
                    Recommended <span className="text-[#f54748]">Foods</span>
                </div>
                <div className="grid gap-8 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    {
                        ratedFood?.map(currELe => <FoodCard key={currELe?._id} currEle={currELe} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default RecommendedFood