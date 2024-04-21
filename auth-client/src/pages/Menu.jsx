import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFoodContext } from '../../context/FoodContext'
import axios from 'axios'
import FoodCard from '../components/FoodCard'

function Menu() {
  const { food, setFood } = useFoodContext()
  const [active, setActive] = useState(0)

  const [value, setValue] = useState({
    id: 0,
    name: "All",
    value: "all"
  })

  const category = [
    {
      id: 0,
      name: "All",
      value: "all"
    },
    {
      id: 1,
      name: "Starter",
      value: "Starter"
    },
    {
      id: 2,
      name: "Desert",
      value: "Desert"
    },
    {
      id: 3,
      name: "Drinks",
      value: "Drinks"
    },
    {
      id: 4,
      name: "Fruit",
      value: "Fruit"
    },
    {
      id: 5,
      name: "Chicken",
      value: "Chicken"
    },
    {
      id: 6,
      name: "Rice",
      value: "Rice"
    },
  ]

  const handleBtn = (btn) => {
    setActive(btn.id)
    setValue(btn)
  }

  const getFoods = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/food/getAllFoods?category=${value.value}`)

      if (res.data.success) {
        setFood(res.data.data.foodItems)
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(food);
  useEffect(() => {
    getFoods()
  }, [value])


  return (
    <div className="pt-[16vh]">
      <div className="container mx-auto py-8">
        <div className="p-5 mb-14">
          <div className="flex flex-wrap justify-center mb-8 gap-5">
            {
              category.map(btn => (
                <Link key={btn.id}><button
                  className={active === btn.id ? "text-xl px-4 py-3 text-center text-white bg-red-500 border-red-500 border-2 rounded- justify-center font-medium"
                    : "text-xl px-4 py-3 text-red-500 border-red-500 border-2 rounded-sm font-medium"}
                  onClick={() => handleBtn(btn)}
                >{btn.name}</button></Link>
              ))
            }
          </div>
          <div className="grid gap-8 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {
              food?.map((currEle) => <FoodCard key={currEle?._id} currEle={currEle} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu

