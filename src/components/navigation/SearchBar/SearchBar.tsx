import "./SearchBar.css";
import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import type { FormEvent, KeyboardEvent } from "react";
import useDebounce from "../../../hooks/useDebounce";
import SearchSuggestions from "../../shop/SearchSuggestions";
import productService from "../../../services/product/productService";
import categoryService from "../../../services/category/categoryService";
import type { ProductResponse, CategoryResponse } from "../../../types/api";

function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const containerRef = useRef<HTMLFormElement>(null);

    const qFromUrl = searchParams.get("q") || "";
    const catFromUrl = searchParams.get("category") || "all";

    const [searchTerm, setSearchTerm] = useState(qFromUrl);
    const [selectedCategory, setSelectedCategory] = useState(catFromUrl);
    const [prevQ, setPrevQ] = useState(qFromUrl);
    const [prevCat, setPrevCat] = useState(catFromUrl);

    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    if (qFromUrl !== prevQ || catFromUrl !== prevCat) {
        setPrevQ(qFromUrl);
        setPrevCat(catFromUrl);
        setSearchTerm(qFromUrl);
        setSelectedCategory(catFromUrl);
    }

    // Fetch categories and products for autocomplete suggestions
    useEffect(() => {
        let isMounted = true;
        categoryService.getAllCategories()
            .then((data) => {
                if (isMounted) setCategories(data);
            })
            .catch(() => {});

        productService.getAllProducts()
            .then((data) => {
                if (isMounted) setProducts(data);
            })
            .catch(() => {});

        return () => {
            isMounted = false;
        };
    }, []);

    // Calculate count of suggestions matching debouncedSearchTerm
    const suggestionCount = useMemo(() => {
        if (!debouncedSearchTerm.trim()) return 0;
        const term = debouncedSearchTerm.trim().toLowerCase();
        const catCount = categories.filter((c) => c.name.toLowerCase().includes(term)).slice(0, 3).length;
        const prodCount = products.filter(
            (p) =>
                p.name.toLowerCase().includes(term) ||
                p.brand.toLowerCase().includes(term) ||
                p.description.toLowerCase().includes(term)
        ).slice(0, 5).length;
        return 1 + catCount + prodCount; // 1 for direct search term option
    }, [debouncedSearchTerm, categories, products]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearchExecute = (queryText: string, categoryVal: string = selectedCategory) => {
        const params = new URLSearchParams(searchParams);
        if (queryText.trim()) {
            params.set("q", queryText.trim());
        } else {
            params.delete("q");
        }
        if (categoryVal && categoryVal !== "all") {
            params.set("category", categoryVal);
        } else {
            params.delete("category");
        }
        params.set("page", "1"); // Reset to page 1

        setShowSuggestions(false);

        if (location.pathname === "/products") {
            navigate(`/products?${params.toString()}`);
        } else {
            navigate(`/products?${params.toString()}`);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSearchExecute(searchTerm, selectedCategory);
    };

    const handleClear = () => {
        setSearchTerm("");
        setSelectedIndex(-1);
        handleSearchExecute("", selectedCategory);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || suggestionCount === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1 < suggestionCount ? prev + 1 : 0));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestionCount - 1));
        } else if (e.key === "Escape") {
            setShowSuggestions(false);
            setSelectedIndex(-1);
        }
    };

    const handleSelectProduct = (product: ProductResponse) => {
        navigate(`/products/${product.id}`);
        setShowSuggestions(false);
    };

    const handleSelectCategory = (categoryName: string) => {
        setSelectedCategory(categoryName);
        handleSearchExecute(searchTerm, categoryName);
    };

    const handleSelectSearchTerm = (term: string) => {
        handleSearchExecute(term);
    };

    return (
        <form
            ref={containerRef}
            className="search-bar"
            role="search"
            onSubmit={handleSubmit}
            style={{ position: "relative" }}
        >
            <select
                className="search-bar__category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Product Category"
            >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <div className="search-bar__input-wrapper">
                <input
                    className="search-bar__input"
                    type="search"
                    placeholder="Search AmazonScale"
                    aria-label="Search Products"
                    aria-autocomplete="list"
                    aria-controls="search-suggestions-list"
                    aria-expanded={showSuggestions && suggestionCount > 0}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                        setSelectedIndex(-1);
                    }}
                    onFocus={() => {
                        if (searchTerm.trim()) setShowSuggestions(true);
                    }}
                    onKeyDown={handleKeyDown}
                />
                {searchTerm && (
                    <button
                        type="button"
                        className="search-bar__clear-btn"
                        onClick={handleClear}
                        aria-label="Clear search text"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <button
                className="search-bar__button"
                type="submit"
                aria-label="Submit Search"
            >
                <Search size={20} strokeWidth={2.5} className="search-bar__icon" />
            </button>

            {showSuggestions && debouncedSearchTerm.trim().length > 0 && (
                <SearchSuggestions
                    products={products}
                    categories={categories}
                    searchTerm={debouncedSearchTerm}
                    selectedIndex={selectedIndex}
                    onSelectProduct={handleSelectProduct}
                    onSelectCategory={handleSelectCategory}
                    onSelectSearchTerm={handleSelectSearchTerm}
                />
            )}
        </form>
    );
}

export default SearchBar;