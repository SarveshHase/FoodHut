import React from 'react'
import logo from '../assets/Logo.svg'
import { NavLink, Link } from 'react-router-dom'

function Register() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="register mb-12">
            <div className="w-full mx-auto pt-[16vh]">
                <form onSubmit={handleSubmit} className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto rounded-md px-8 py-5">
                    <NavLink to='/'>
                        <img src={logo} alt="" className='logo mb-6 bg-contain mx-auto cursor-pointer' />
                    </NavLink>

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
                </form>
            </div>
        </div>
    )
}

export default Register