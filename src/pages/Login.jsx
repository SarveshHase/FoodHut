import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/Logo.svg'

function Login() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className="login">
            <div className="h-screen pt-[16vh]">
                <form onSubmit={handleSubmit} className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-5">
                    <NavLink to='/'>
                        <img src={logo} alt="" className='logo mb-6 cursor-pointer text-center' />
                    </NavLink>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm mb-2">
                            Email
                        </label>
                        <input type="email" id='email' name='email' placeholder='Enter your email' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md sm:w-[20rem]" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm mb-2">
                            Password
                        </label>
                        <input type="password" id='password' name='password' placeholder='********' className="shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-md sm:w-[20rem]" />
                    </div>
                    <button className="bg-[#f54748] active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl w-full rounded-full px-8 py-2 text-xl fonr-medium text-white mx-auto text-center" type='submit'>Sign In</button>

                    <Link to='/register' className='text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded hover:underline hover:underline-offset-4 active:scale-90 transition duration-150 transform'>
                        Create an Account
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login