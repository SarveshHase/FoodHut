import React, { useState } from 'react'
import { useUserContext } from '../../context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const { user, setUser } = useUserContext()
    const navigate = useNavigate()

    const handleInputChange = (index, value) => {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
    }

    const combineOtp = parseInt(otp.join(''))

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const email = user?.user?.email
        const dataOtp = { email, combineOtp }
        // console.log(combineOtp);

        fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/user/verifyotp`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(dataOtp)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    navigate('/')
                    location.reload()
                    toast.success(data.message)
                }
                else {
                    toast.error(data.message)
                }
            })
    }

    return (
        <div className="relative pt-[15vh] flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email <span className='text-red-700'>{user?.user?.email}</span></p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <form onSubmit={handleOnSubmit}>
                        <div className="flex flex-col space-y-16 my-[35px]">
                            <div className="flex justify-center items-center">
                                {
                                    otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type='text'
                                            value={digit}
                                            maxLength='1'
                                            onChange={
                                                (e) => handleInputChange(index, e.target.value)
                                            }
                                            className='w-12 h-12 mx-2 border border-gray-300 rounded text-center text-xl'
                                        />
                                    ))
                                }
                            </div>
                        </div>
                        <button type='submit' className='
                        bg-[#f54748] active:scale-90 transition duration-150 transform shadow-md hover:shadow-xl w-full rounded-full px-4 py-3 text-xl font-medium text-white mx-auto text-center
                        '>
                            Verify Account
                        </button>
                        <ToastContainer />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerifyOtp