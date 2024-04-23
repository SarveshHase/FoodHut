import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useFoodContext } from '../../context/FoodContext';
import axios from 'axios';
import FoodCard from './FoodCard';

function NewFoods() {
    const [newFood, setNewFood] = useState([])
    const { food, setFood } = useFoodContext()

    const getFoods = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/food/getnewFoods`)

            if (res.data.success) {
                setNewFood(res.data.data.foodItems)
            }
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(newFood);
    useEffect(() => {
        getFoods()
    }, [newFood])


    return (
        <div className="py-3 px-10 sm:px-4 md:px-6">
            <div className="container mx-auto py-[2vh]">
                <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
                    New <span className="text-[#f54748]">Foods</span>
                </div>
                <div className="grid gap-8 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    {
                        newFood?.map(currEle => <FoodCard key={currEle?._id} currEle={currEle} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default NewFoods