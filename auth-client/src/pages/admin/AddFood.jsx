import { useState } from 'react'
import { NavLink } from 'react-router-dom'
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
        const foodData = {
            name: form.name.value,
            price: form.price.value,
            category: category,
            weight: form.weight.value,
            description: form.description.value,
            foodImage: image?.url || ""
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/food/addFood`,
                { foodData },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                form.reset();
                setCategory('');
                setImage({});
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error("Error adding food:", error);
            toast.error("Failed to add food");
        }
    };

    return (
        <div className="addfood">
            <div className="w-full mx-auto pt-[16vh]">
                <form className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5 mb-7" onSubmit={handleOnSubmit}>
                    <NavLink to='/'>
                        <img src={logo} alt="" className='logo mb-9 cursor-pointer text-center' />
                    </NavLink>

                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-6">
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-gray-700 text-sm mb-2">
                                Food Name
                            </label>
                            <input
                                type="text"
                                id='name'
                                name='name'
                                placeholder='Enter food Name'
                                className="input shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="block text-gray-700 text-sm mb-2">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                id='price'
                                name='price'
                                placeholder='Enter price'
                                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category" className="block text-gray-700 text-sm mb-2">
                                Category
                            </label>
                            <select
                                className="select select-md w-full bg-red-500 text-white"
                                name="category"
                                value={category}
                                onChange={handleCategory}
                                required
                            >
                                <option disabled value="">Select Category</option>
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
                            <input
                                type="number"
                                id='weight'
                                name='weight'
                                placeholder='Enter weight in grams'
                                className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="myFile" className="block text-gray-700 text-sm mb-2">
                                Food Image
                            </label>
                            <input
                                type="file"
                                name='myFile'
                                accept='.jpeg, .png, .jpg'
                                className="file-input file-input-bordered file-input-md w-full bg-red-500 text-gray-200"
                                onChange={handleImage}
                                required
                            />
                        </div>

                        <div className="mb-3 col-span-2">
                            <label htmlFor="description" className="block text-gray-700 text-sm mb-2">
                                Description
                            </label>
                            <textarea
                                name='description'
                                className="textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-md"
                                placeholder="Enter description"
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    <button
                        className="bg-[#f54748] active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl w-full rounded-full px-8 py-2 mt-6 text-xl font-medium text-white mx-auto text-center"
                        type='submit'
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Add Food'}
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default AddFood