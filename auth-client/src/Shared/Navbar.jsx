import React, { useState } from 'react'
import logo from '../assets/Logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useUserContext } from '../../context/UserContext';

function Navbar() {
    const [nav, setNav] = useState(false);
    const { user, setUser } = useUserContext();
    console.log(user);

    const handleNav = () => {
        setNav(!nav)
    }

    return (
        <>
            <div className="bg-white/80 shadow-md fixed top-0 left-0 w-full z-40 ease-in duration-300 backdrop-blur-md">
                {
                    user?.user.isVerified === false && (<div className='bg-red-500 py-3 px-4 text-white'>
                        <Link to="/verifyOtp">Please verify OTP</Link>
                    </div>)
                }
                <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6 container mx-auto">
                    <div className="flex items-center justify-between">
                        <NavLink to="/">
                            <img src={logo} alt="" className='h-14 cursor-pointer' />
                        </NavLink>

                        <div className="lg:flex hidden gap-8 items-center">
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                            }>
                                Today's Special
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                            }>
                                Why Us
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                            }>
                                Our Menu
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                            }>
                                Add Food
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                            }>
                                Popular Food
                            </NavLink>

                            <Link to="/login">
                                <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
                                    Login
                                </button>
                            </Link>
                        </div>

                        <div className="block lg:hidden z-40" onClick={handleNav}>
                            {
                                (nav) ? <RxCross2 size={20} className='text-[#191919] cursor-pointer' /> : <TiThMenu size={20} className='text-red-500 cursor-pointer' />
                            }
                        </div>
                    </div>

                    <div className={`lg:hidden absolute w-1/2 sm:w-2/5 h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm backdrop-blur-md bg-white/80 top-0 duration-300 ${nav ? "right-0" : "right-[-100%]"} pt-24`}>
                        <div className="flex flex-col gap-8 items-center">
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-base font-medium hover:text-red-500`
                            }>
                                Today's Special
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-base font-medium hover:text-red-500`
                            }>
                                Why Us
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-base font-medium hover:text-red-500`
                            }>
                                Our Menu
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-base font-medium hover:text-red-500`
                            }>
                                Add Food
                            </NavLink>
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-base font-medium hover:text-red-500`
                            }>
                                Popular Food
                            </NavLink>

                            <Link to="/login">
                                <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
                                    Login
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar