import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/Logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function AddFood() {
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const [category, setCategory] = useState('');

    const handleCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file)
        setUploading(true)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/all/upload-image`, formData)
            setUploading(false)
            setImage({
                url: data.url,
                public_id: data.public_id
            }) //setting the image cresentials from the data fetched from backend

            if (!uploading) {
                toast.success("Food image uploaded successfully")
            }
        } catch (error) {
            console.log("Error while uploading the image", error)
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const foodName = form.name.value;
        const price = form.price.value;
        const categoryTemp = category;
        const weight = form.weight.value;
        const location = form.location.value;
        const description = form.description.value;
        const foodImage = image?.url || "";
        const foodData = { name: foodName, price, category: categoryTemp, weight, location, description, foodImage }
        // console.log(foodData);

        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/food/addFood`,
            { foodData },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

        // console.log(res);

        if (res.data.success) {
            toast.success(res.data.message)
            form.reset();
        } else {
            toast.error(res.data.message)
        }
    }

    return (
        <div className="addfood">
            <div className="w-full mx-auto pt-[16vh]">
                <form className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5 mb-7" onSubmit={handleOnSubmit}>
                    <NavLink to='/'>
                        <img src={logo} alt="" className='logo mb-9 cursor-pointer text-center' />
                    </NavLink>

                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-gray-700 text-sm mb-2">
                                Food Name
                            </label>
                            <input type="text" id='name' name='name' placeholder='Enter food Name' className="input shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="myFile" className="block text-gray-700 text-sm mb-2">
                                Upload Food Image
                            </label>
                            <input type="file" name='myFile' accept=' .jpeg, .png, .jpg' className="file-input file-input-bordered file-input-md w-full bg-red-500 text-gray-200 " onChange={handleImage} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="block text-gray-700 text-sm mb-2">
                                Price
                            </label>
                            <input type="number" id='price' name='price' placeholder='Enter price' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="block text-gray-700 text-sm mb-2">
                                Select Category
                            </label>
                            <select
                                className="select select-md w-full max-w-xs bg-red-500 text-white"
                                name="category"
                                value={category} // Set the value of select to the state
                                onChange={handleCategory} // Update state when the user selects an option
                            >
                                <option disabled value="">Category</option>
                                <option value="Starter">Starter</option>
                                <option value="Desert">Desert</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Fruit">Fruit</option>
                                <option value="Chicken">Chicken</option>
                                <option value="Rice">Rice</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="weight" className="block text-gray-700 text-sm mb-2">
                                Weight (in grams)
                            </label>
                            <input type="number" id='weight' name='weight' placeholder='Enter weight in grams' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="location" className="block text-gray-700 text-sm mb-2">
                                Location
                            </label>
                            <input type="text" id='location' name='location' placeholder='Enter location' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3 col-span-2">
                            <label htmlFor="description" className="block text-gray-700 text-sm mb-2">
                                Description
                            </label>
                            <textarea name='description' className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md" placeholder="Enter description" />
                        </div>
                    </div>
                    <button className="bg-[#f54748] active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl w-full rounded-full px-8 py-2 mt-6 text-xl fonr-medium text-white mx-auto text-center" type='submit'>Add Food</button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default AddFood