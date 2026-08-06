import "./SearchSuggestions.css";
import type { ProductResponse, CategoryResponse } from "../../../types/api";
import { Search, Tag, Package } from "lucide-react";

interface SearchSuggestionsProps {
    products: ProductResponse[];
    categories: CategoryResponse[];
    searchTerm: string;
    selectedIndex: number;
    onSelectProduct: (product: ProductResponse) => void;
    onSelectCategory: (categoryName: string) => void;
    onSelectSearchTerm: (term: string) => void;
}

export function SearchSuggestions({
    products,
    categories,
    searchTerm,
    selectedIndex,
    onSelectProduct,
    onSelectCategory,
    onSelectSearchTerm,
}: SearchSuggestionsProps) {
    if (!searchTerm.trim()) return null;

    const trimmedTerm = searchTerm.trim().toLowerCase();

    // Filter matching categories
    const matchingCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(trimmedTerm)
    ).slice(0, 3);

    // Filter matching products
    const matchingProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(trimmedTerm) ||
            p.brand.toLowerCase().includes(trimmedTerm) ||
            p.description.toLowerCase().includes(trimmedTerm)
    ).slice(0, 5);

    const hasResults = matchingCategories.length > 0 || matchingProducts.length > 0;

    let currentIndex = 0;

    return (
        <div
            className="search-suggestions"
            id="search-suggestions-list"
            role="listbox"
            aria-label="Search Suggestions"
        >
            {/* Direct query action */}
            <div
                tabIndex={-1}
                role="option"
                aria-selected={selectedIndex === currentIndex}
                className={`suggestion-item suggestion-item--query ${selectedIndex === currentIndex ? "suggestion-item--active" : ""}`}
                onClick={() => onSelectSearchTerm(searchTerm)}
            >
                <Search size={16} className="suggestion-icon" />
                <span>Search for <strong>"{searchTerm}"</strong></span>
            </div>

            {/* Matching Categories Section */}
            {matchingCategories.length > 0 && (
                <div className="suggestion-group">
                    <div className="suggestion-group__title">Categories</div>
                    {matchingCategories.map((cat) => {
                        currentIndex++;
                        const isSelected = selectedIndex === currentIndex;
                        return (
                            <div
                                key={`cat-${cat.id}`}
                                tabIndex={-1}
                                role="option"
                                aria-selected={isSelected}
                                className={`suggestion-item ${isSelected ? "suggestion-item--active" : ""}`}
                                onClick={() => onSelectCategory(cat.name)}
                            >
                                <Tag size={16} className="suggestion-icon suggestion-icon--category" />
                                <span>In <strong>{cat.name}</strong></span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Matching Products Section */}
            {matchingProducts.length > 0 && (
                <div className="suggestion-group">
                    <div className="suggestion-group__title">Products</div>
                    {matchingProducts.map((p) => {
                        currentIndex++;
                        const isSelected = selectedIndex === currentIndex;
                        return (
                            <div
                                key={`prod-${p.id}`}
                                tabIndex={-1}
                                role="option"
                                aria-selected={isSelected}
                                className={`suggestion-item suggestion-item--product ${isSelected ? "suggestion-item--active" : ""}`}
                                onClick={() => onSelectProduct(p)}
                            >
                                {p.imageUrl ? (
                                    <img src={p.imageUrl} alt={p.name} className="suggestion-thumb" />
                                ) : (
                                    <Package size={20} className="suggestion-icon" />
                                )}
                                <div className="suggestion-details">
                                    <span className="suggestion-name">{p.name}</span>
                                    <span className="suggestion-sub">
                                        {p.brand && <span className="suggestion-brand">{p.brand} • </span>}
                                        <span className="suggestion-price">${Number(p.price).toFixed(2)}</span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {!hasResults && (
                <div className="suggestion-empty">
                    No suggestions found for "{searchTerm}"
                </div>
            )}
        </div>
    );
}

export default SearchSuggestions;
