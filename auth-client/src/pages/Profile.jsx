import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../context/UserContext';
import axios from 'axios';

function Profile() {
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate()
    const { user } = useUserContext()

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file)
        setUploading(true)
        try {
            const { data } = await axios.post('http://localhost:8000/api/v1/all/upload-image', formData)
            setUploading(false)
            setImage({
                url: data.url,
                public_id: data.public_id
            }) //setting the image cresentials from the data fetched from backend
            toast.success("Profile image updated successfully")
        } catch (error) {
            console.log("Error while uploading the image", error)
        }
    }

    const handleOnUpdateSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value;
        const avatar = image?.url
        const city = form.city.value;
        const district = form.district.value;
        const state = form.state.value;
        const zipcode = form.zipcode.value;
        const userId = user?.user?._id;
        const userData = { userId, name, avatar, city, district, state, zipcode }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const res = await axios.put("http://localhost:8000/api/v1/user/update-profile", userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data.success) {
                toast.success(res.data.message);
                form.reset();
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log("Error while updating profile: ", error);
            navigate("/login");
        }
    }

    return (
        <div className="profile">
            <div className="w-full mx-auto pt-[16vh]">
                <form className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5 mb-7" onSubmit={handleOnUpdateSubmit}>
                    <label htmlFor='file-upload' className='custom-file-upload'>
                        <img src={image?.url || user?.user?.avatar} alt="" className='h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer' />
                    </label>
                    <label className='block text-center text-gray-900 text-base mb-2'>Profile Picture</label>
                    <input type="file" label='Image' name='myFile' id='file-upload' className='hidden' accept=' .jpeg, .png, .jpg' onChange={handleImage} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-gray-700 text-sm mb-2">
                                Name:
                            </label>
                            <input type="text" id='name' name='name' placeholder={user?.user?.name} className="input shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
                                Email:
                            </label>
                            <input type="email" readOnly id='email' name='email' placeholder={user?.user?.email} className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3">
                            <input type="text" id='city' name='city' placeholder={user?.user?.city || "City"} className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3">
                            <input type="text" id='district' name='district' placeholder={user?.user?.district || "District"} className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3">
                            <input type="text" id='state' name='state' placeholder={user?.user?.state || "State"} className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-md" />
                        </div>

                        <div className="mb-3">
                            <input type="text" id='zipcode' name='zipcode' placeholder={user?.user?.zipcode || "Zip code"} className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-md" />
                        </div>
                    </div>
                    <button className="bg-[#f54748] active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl w-full rounded-full px-8 py-2 mt-6 text-xl fonr-medium text-white mx-auto text-center" type='submit'>Update Profile</button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Profile