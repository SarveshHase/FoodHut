import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { useLoaderContext } from '../../context/Loadercontext';
import { toast } from 'react-toastify';

function FoodCard({ currEle }) {
    const { cartItems, addToCart, removeItem } = useCartContext();
    const { manageProgress } = useLoaderContext();

    const isInCart = cartItems.some(item => item._id === currEle._id);

    const handleCartAction = (e) => {
        e.preventDefault(); // Prevent navigation when clicking the button

        manageProgress();
        if (isInCart) {
            removeItem(currEle);
            toast.success("Removed from cart!");
        } else {
            const item = {
                ...currEle,
                qty: 1  // Default quantity when adding from card
            };
            addToCart(item);
            toast.success("Added to cart!");
        }
    };

    return (
        <Link to={`/menu/${currEle?._id}`}>
            <div className="food-card bg-red-200/[0.3] rounded-xl flex flex-col cursor-pointer items-center p-5">
                <div className="relative inline-block">
                    <img src={currEle?.foodImage} alt="" className='w-40 h-40 hover:scale-110 transition-all duration-500 cursor-pointer' />
                </div>

                <div className="flex flex-col items-center mt-3 space-y-3">
                    <h3 className="font-semibold text-xl text-center min-h-[56px]">
                        {currEle?.name}
                    </h3>
                    <p className="text-lg text-[#f54748]">
                        <span>₹</span>{currEle?.price}
                    </p>
                    <button
                        onClick={handleCartAction}
                        className={`active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium ${isInCart
                            ? 'bg-white text-[#f54748] border-2 border-[#f54748]'
                            : 'bg-[#f54748] text-white'
                            }`}
                    >
                        {isInCart ? 'Remove from Cart' : 'Add To Cart'}
                    </button>
                </div>
            </div>
        </Link>
    )
}

FoodCard.propTypes = {
    currEle: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        foodImage: PropTypes.string.isRequired
    }).isRequired
}

export default FoodCard;
