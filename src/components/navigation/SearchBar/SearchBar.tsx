import "./SearchBar.css";
import { Search } from "lucide-react";

function SearchBar() {
    return (
        <form className="search-bar" role="search" onSubmit={(e) => e.preventDefault()}>
            <select
                className="search-bar__category"
                defaultValue="all"
                aria-label="Product Category"
            >
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="books">Books</option>
                <option value="home">Home</option>
                <option value="beauty">Beauty</option>
                <option value="sports">Sports</option>
                <option value="toys">Toys</option>
            </select>

            <input
                className="search-bar__input"
                type="search"
                placeholder="Search AmazonScale"
                aria-label="Search Products"
            />

            <button
                className="search-bar__button"
                type="submit"
                aria-label="Search"
            >
                <Search size={20} strokeWidth={2.5} className="search-bar__icon" />
            </button>
        </form>
    );
}

export default SearchBar;