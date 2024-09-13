import React, { useState } from 'react'
import avatar from '../assets/avatar.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [image, setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    const navigate = useNavigate()


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
        } catch (error) {
            console.log("Error while uploading the image", error)
        }
    }
    // console.log(image);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordConfirm = form.confirmPassword.value;
        const avatar = image?.url || "";
        const userData = { name, email, password, passwordConfirm, avatar }
        console.log(userData);

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.success) {
                    // console.log(data.data.token);
                    localStorage.setItem("token", String(data.data.token));
                    console.log(localStorage.getItem("token"));
                    toast.success(data.message);
                    form.reset();
                    navigate('/');
                }

                else {
                    toast.error(data.message)
                }
            })
    }

    return (
        <div className="register mb-12">
            <div className="w-full mx-auto pt-[16vh]">
                <form onSubmit={handleOnSubmit} className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5">
                    <label htmlFor='file-upload' className='custom-file-upload'>
                        <img src={image?.url || avatar} alt="" className='h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer' />
                    </label>
                    <label className='block text-center text-gray-900 text-base mb-2'>Upload your profile picture</label>
                    <input type="file" label='Image' name='myFile' id='file-upload' className='hidden' accept=' .jpeg, .png, .jpg' onChange={handleImage} />

                    <div className="mb-3">
                        <label htmlFor="name" className="block text-gray-700 text-sm mb-2">
                            Name
                        </label>
                        <input type="text" id='name' name='name' placeholder='Enter your Name' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
                            Email
                        </label>
                        <input type="email" id='email' name='email' placeholder='Enter your email' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md" />
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-gray-700 text-sm mb-2">
                                Password
                            </label>
                            <input type="password" id='password' name='password' placeholder='********' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm mb-2">
                                Confirm Password
                            </label>
                            <input type="password" id='confirmPassword' name='confirmPassword' placeholder='********' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md" />
                        </div>
                    </div>
                    <button className="bg-[#f54748] active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl w-full rounded-full px-8 py-2 text-xl fonr-medium text-white mx-auto text-center" type='submit'>Register</button>

                    <div className="flex items-center justify-between">
                        <Link to='/login' className='text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded hover:underline hover:underline-offset-4 active:scale-90 transition duration-150 transform'>
                            Login to an existing account
                        </Link>
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    )
}

export default Register