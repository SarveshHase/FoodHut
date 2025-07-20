import chef from '../assets/chef2.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLoaderContext } from "../../context/Loadercontext"

function Service() {
    const { manageProgress } = useLoaderContext()
    const navigate = useNavigate()

    return (
        <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
            <div className="container mx-auto py-[2vh]">
                <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
                    <div className="w-full lg:w-[32rem] flex flex-col space-y-6">
                        <div className="text-2xl md:text-3xl font-bold text-[#2e2e2e] lg:text-4xl">
                            We are <span className="text-[#f54748]">more</span> than <span className="text-[#fdc55e]">
                                multiple
                            </span> service
                        </div>
                        <div className="lg:text-lg text-[#191919] md:text-base text-sm">
                            Discover a world of culinary excellence with our diverse range of services. From expert chefs crafting delicious meals to prompt delivery and exceptional customer care, we ensure every aspect of your dining experience is perfect. Our commitment to quality and service excellence sets us apart in the food delivery industry.
                        </div>
                        <Link to="/whyus" className="flex gap-8 items-center" onClick={(e) => {
                            e.preventDefault();
                            manageProgress();
                            navigate('/whyus');
                        }}>
                            <button className="bg-[#f54748] active:scale-90 transition transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">About Us</button>
                        </Link>
                    </div>
                    <img src={chef} alt="" className="w-full h-auto lg:h-[32rem] mx-auto justify-end" />
                </div>
            </div>
        </div>
    )
}

export default Service