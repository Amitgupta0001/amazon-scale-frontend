import "./SearchBar.css";

import { Search } from "lucide-react";

function SearchBar() {
    return (
        <form className="search-bar">

            <select
                className="search-bar__category"
                defaultValue="all"
            >
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="books">Books</option>
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
            </select>

            <input
                type="text"
                className="search-bar__input"
                placeholder="Search AmazonScale"
            />

            <button
                className="search-bar__button"
                type="submit"
            >
                <Search size={22}/>
            </button>

        </form>
    );
}

export default SearchBar;