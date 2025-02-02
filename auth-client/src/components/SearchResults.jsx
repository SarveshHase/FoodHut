import { useEffect } from 'react';
import { useSearchContext } from '../../context/SearchContext';
import axios from 'axios';
import FoodCard from './FoodCard';

function SearchResults() {
    const { searchTerm, searchResults, setSearchResults, isSearching } = useSearchContext();

    useEffect(() => {
        const searchFoods = async () => {
            if (!searchTerm) return;
            
            try {
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/food/search?term=${searchTerm}`);
                if (res.data.success) {
                    setSearchResults(res.data.data.foodItems);
                }
            } catch (error) {
                console.error('Search error:', error);
            }
        };

        searchFoods();
    }, [searchTerm]);

    if (!isSearching) return null;

    return (
        <div className="py-3 px-10 sm:px-4 md:px-6">
            <div className="container mx-auto py-[2vh]">
                <div className="text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text-4xl">
                    Search Results for: <span className="text-[#f54748]">{searchTerm}</span>
                </div>
                {searchResults.length === 0 ? (
                    <div className="text-center mt-8">No results found</div>
                ) : (
                    <div className="grid gap-8 py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                        {searchResults.map(food => (
                            <FoodCard key={food._id} currEle={food} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResults; 