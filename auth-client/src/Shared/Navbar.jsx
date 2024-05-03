import React, { useState } from 'react'
import logo from '../assets/Logo.svg'
import { Link, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { useUserContext } from '../../context/UserContext';
import { useCartContext } from '../../context/CartContext';
import LoadingBar from 'react-top-loading-bar'
import { useLoaderContext } from '../../context/Loadercontext';

function Navbar() {
    const [nav, setNav] = useState(false);
    const { user, setUser } = useUserContext();
    const navigate = useNavigate()
    console.log(user);

    const handleNav = () => {
        setNav(!nav)
    }

    const { cartItems } = useCartContext();

    const { progress, setProgress, manageProgress } = useLoaderContext()

    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                height={3}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className="bg-white/80 shadow-md fixed top-0 left-0 w-full z-40 ease-in duration-300 backdrop-blur-md">
                {
                    user?.user?.isVerified === false && (<div className='bg-red-500 py-3 px-4 text-white'>
                        <Link to="/verifyOtp">Please verify OTP</Link>
                    </div>)
                }
                <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6 container mx-auto">
                    <div className="flex items-center justify-between">
                        <NavLink to="/" onClick={(e) => {
                            e.preventDefault();
                            manageProgress();
                            navigate('/');
                        }}>
                            <img src={logo} alt="" className='h-14 cursor-pointer' />
                        </NavLink>

                        <div className="lg:flex hidden gap-8 items-center">
                            <NavLink to="/" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                            } onClick={(e) => {
                                e.preventDefault();
                                manageProgress();
                                navigate('/');
                            }}>
                                Today's Special
                            </NavLink>
                            <NavLink to="/whyus" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                            } onClick={(e) => {
                                e.preventDefault();
                                manageProgress();
                                navigate('/whyus');
                            }}>
                                Why Us
                            </NavLink>

                            <NavLink to="/menu" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                            } onClick={(e) => {
                                e.preventDefault();
                                manageProgress();
                                navigate('/menu');
                            }}>
                                Our Menu
                            </NavLink>
                            {user?.user?.role === "admin" && (
                                <NavLink to="/admin/addFood" className={({ isActive }) =>
                                    `${isActive ? "text-red-500" : "text-[#191919]"} text-xl font-medium hover:text-red-500`
                                } onClick={(e) => {
                                    e.preventDefault();
                                    manageProgress();
                                    navigate('/admin/addFood');
                                }}>
                                    Add Food
                                </NavLink>)
                            }

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge badge-sm text-red-500 indicator-item">{cartItems?.length}</span>
                                    </div>
                                </div>
                                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-red-100 shadow">
                                    <div className="card-body">
                                        <span className="font-bold text-lg">{cartItems?.length || 0} Items</span>
                                        <div className="card-actions">
                                            <Link to="/viewcart" onClick={(e) => {
                                                e.preventDefault();
                                                manageProgress();
                                                navigate('/viewcart');
                                            }}>
                                                <button className="bg-[#f54748] active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl rounded-full px-3 py-2 text-xl fonr-medium text-white mx-auto text-center" type='submit'>View Cart</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                user ?
                                    (<div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img alt="profile" src={user?.user?.avatar} />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52">
                                            <li>
                                                <Link to="/profile" className="justify-between" onClick={(e) => {
                                                    e.preventDefault();
                                                    manageProgress();
                                                    navigate('/profile');
                                                }}>
                                                    Profile
                                                </Link>
                                            </li>
                                            <li><Link><button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-2 py-1 text-sm font-medium text-white"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    manageProgress();
                                                    localStorage.clear()
                                                    location.reload()
                                                    navigate("/")
                                                }}
                                            >Logout</button></Link></li>
                                        </ul>
                                    </div>) :
                                    (<Link to="/login" onClick={(e) => {
                                        e.preventDefault();
                                        manageProgress();
                                        navigate('/login');
                                    }}>
                                        <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
                                            Login
                                        </button>
                                    </Link>)
                            }
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
                            } onClick={(e) => {
                                e.preventDefault();
                                manageProgress();
                                navigate('/');
                            }}>
                                Today's Special
                            </NavLink>
                            <NavLink to="/whyus" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-base font-medium hover:text-red-500`
                            } onClick={(e) => {
                                e.preventDefault();
                                manageProgress();
                                navigate('/whyus');
                            }}>
                                Why Us
                            </NavLink>
                            <NavLink to="/menu" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-base font-medium hover:text-red-500`
                            } onClick={(e) => {
                                e.preventDefault();
                                manageProgress();
                                navigate('/menu');
                            }}>
                                Our Menu
                            </NavLink>
                            {user?.user?.role === "admin" && (<NavLink to="/admin/addFood" className={({ isActive }) =>
                                `${isActive ? "text-red-500" : "text-[#191919]"} text-base font-medium hover:text-red-500`
                            } onClick={(e) => {
                                e.preventDefault();
                                manageProgress();
                                navigate('/admin/addFood');
                            }}>
                                Add Food
                            </NavLink>)
                            }

                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <div className="indicator">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <span className="badge badge-sm text-red-500 indicator-item">{cartItems?.length}</span>
                                    </div>
                                </div>
                                <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-red-100 shadow">
                                    <div className="card-body">
                                        <span className="font-bold text-lg">{cartItems?.length || 0} Items</span>
                                        <div className="card-actions">
                                            <Link to="viewcart" onClick={(e) => {
                                                e.preventDefault();
                                                manageProgress();
                                                navigate('/viewcart');
                                            }}>
                                                <button className="bg-[#f54748] active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl rounded-full px-3 py-2 text-xl fonr-medium text-white mx-auto text-center" type='submit'>View Cart</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                user ?
                                    (<Link>
                                        <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white" onClick={(e) => {
                                            e.preventDefault();
                                            manageProgress();
                                            localStorage.clear()
                                            location.reload()
                                            navigate("/")
                                        }}>
                                            Logout
                                        </button>
                                    </Link>) :
                                    (<Link to="/login" onClick={(e) => {
                                        e.preventDefault();
                                        manageProgress();
                                        navigate('/login');
                                    }}>
                                        <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
                                            Login
                                        </button>
                                    </Link>)
                            }
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar