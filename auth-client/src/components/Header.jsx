import { FaSearch } from "react-icons/fa";
import header from '../assets/banner.png'
import { useSearchContext } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const { setSearchTerm, setIsSearching } = useSearchContext();
    const [localSearch, setLocalSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(localSearch);
        setIsSearching(true);
        navigate('/search');
    };

    return (
        <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
            <div className="container mx-auto py-[14vh]">
                <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
                    <div className="w-full lg:w-[32rem] flex flex-col space-y-6">
                        <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl">
                            We are <span className="text-[#f54748]">Serious</span> About <span className="text-[#f54748]">Food</span> & <span className="text-[#ffc65c]">Customers.</span>
                        </div>

                        <div className="lg:text-xl text-[#191919] md:text-lg text-base">
                            Our website offers a streamlined food ordering system designed to cater to your culinary needs with ease and efficiency. Explore a vast menu of delicious options ranging from local favorites to international cuisines, all available at your fingertips. Each food item is presented with high-quality images and detailed descriptions, ensuring you know exactly what you&apos;re ordering. Experience the joy of dining with just a few clicks, anytime, anywhere.
                        </div>

                        <form onSubmit={handleSearch} className="flex rounded py-2 px-4 justify-between items-center bg-white shadow-md">
                            <div className="flex items-center flex-1">
                                <FaSearch size={22} className='cursor-pointer' />
                                <input
                                    type='text'
                                    value={localSearch}
                                    onChange={(e) => setLocalSearch(e.target.value)}
                                    placeholder='Search Food Here...'
                                    className='text-[#191919] w-full border-none outline-none py-2 px-4'
                                />
                            </div>
                            <button
                                type="submit"
                                className="h-10 w-10 relative bg-[#ffc65c] rounded-full flex items-center justify-center"
                            >
                                <FaSearch size={15} className='text-white' />
                            </button>
                        </form>
                        <div className="flex gap-8 items-center">
                            <button className='bg-[#f54748] active:scale-90 transition duration-200 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'
                                onClick={() => navigate('/menu')}
                            >Explore Now</button>
                        </div>
                    </div>
                    <img src={header} className='w-full h-auto lg:h-[28rem] mx-auto justify-end' alt="" />
                </div>

            </div>

        </div>
    )
}

export default Header