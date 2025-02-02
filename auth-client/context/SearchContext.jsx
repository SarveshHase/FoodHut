import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    return (
        <SearchContext.Provider value={{
            searchTerm,
            setSearchTerm,
            searchResults,
            setSearchResults,
            isSearching,
            setIsSearching
        }}>
            {children}
        </SearchContext.Provider>
    );
};

SearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useSearchContext = () => useContext(SearchContext); 