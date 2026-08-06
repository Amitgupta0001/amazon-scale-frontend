import "./FilterSidebar.css";
import { useState, useEffect } from "react";
import { X, SlidersHorizontal, Check } from "lucide-react";
import FilterSection from "../FilterSection";
import type { CategoryResponse } from "../../../types/api";

export interface FilterState {
    category: string;
    brand: string;
    minPrice: string;
    maxPrice: string;
    inStock: boolean;
}

interface FilterSidebarProps {
    categories: CategoryResponse[];
    availableBrands: string[];
    filters: FilterState;
    onFilterChange: (newFilters: Partial<FilterState>) => void;
    onClearAll: () => void;
    isOpenMobile: boolean;
    onCloseMobile: () => void;
    totalResults: number;
}

export function FilterSidebar({
    categories,
    availableBrands,
    filters,
    onFilterChange,
    onClearAll,
    isOpenMobile,
    onCloseMobile,
    totalResults,
}: FilterSidebarProps) {
    const [priceMinInput, setPriceMinInput] = useState(filters.minPrice);
    const [priceMaxInput, setPriceMaxInput] = useState(filters.maxPrice);
    const [prevMinPrice, setPrevMinPrice] = useState(filters.minPrice);
    const [prevMaxPrice, setPrevMaxPrice] = useState(filters.maxPrice);

    if (filters.minPrice !== prevMinPrice || filters.maxPrice !== prevMaxPrice) {
        setPrevMinPrice(filters.minPrice);
        setPrevMaxPrice(filters.maxPrice);
        setPriceMinInput(filters.minPrice);
        setPriceMaxInput(filters.maxPrice);
    }

    // Handle scroll lock when mobile drawer is open
    useEffect(() => {
        if (isOpenMobile) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpenMobile]);

    const handleApplyPrice = (e: React.FormEvent) => {
        e.preventDefault();
        onFilterChange({
            minPrice: priceMinInput,
            maxPrice: priceMaxInput,
        });
    };

    const handleQuickPrice = (min: string, max: string) => {
        setPriceMinInput(min);
        setPriceMaxInput(max);
        onFilterChange({ minPrice: min, maxPrice: max });
    };

    const content = (
        <aside className="filter-sidebar__content">
            <div className="filter-sidebar__header">
                <div className="filter-sidebar__title-wrapper">
                    <SlidersHorizontal size={18} className="filter-sidebar__icon" />
                    <h2 className="filter-sidebar__title">Filters</h2>
                </div>
                {isOpenMobile && (
                    <button
                        type="button"
                        className="filter-sidebar__close-btn"
                        onClick={onCloseMobile}
                        aria-label="Close filters drawer"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

            {/* Category Filter Section */}
            <FilterSection
                title="Category"
                hasActiveFilter={filters.category !== "all"}
                onReset={() => onFilterChange({ category: "all" })}
            >
                <div className="filter-category-list" role="radiogroup" aria-label="Category Filter">
                    <button
                        type="button"
                        className={`filter-category-item ${filters.category === "all" ? "filter-category-item--active" : ""}`}
                        onClick={() => onFilterChange({ category: "all" })}
                    >
                        <span>All Categories</span>
                        {filters.category === "all" && <Check size={14} />}
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`filter-category-item ${filters.category === cat.name ? "filter-category-item--active" : ""}`}
                            onClick={() => onFilterChange({ category: cat.name })}
                        >
                            <span>{cat.name}</span>
                            {filters.category === cat.name && <Check size={14} />}
                        </button>
                    ))}
                </div>
            </FilterSection>

            {/* Brand Filter Section */}
            {availableBrands.length > 0 && (
                <FilterSection
                    title="Brand"
                    hasActiveFilter={filters.brand !== "all"}
                    onReset={() => onFilterChange({ brand: "all" })}
                >
                    <div className="filter-brand-list">
                        <label className="filter-checkbox-label">
                            <input
                                type="radio"
                                name="brand-filter"
                                checked={filters.brand === "all"}
                                onChange={() => onFilterChange({ brand: "all" })}
                            />
                            <span>All Brands</span>
                        </label>
                        {availableBrands.map((brand) => (
                            <label key={brand} className="filter-checkbox-label">
                                <input
                                    type="radio"
                                    name="brand-filter"
                                    checked={filters.brand === brand}
                                    onChange={() => onFilterChange({ brand })}
                                />
                                <span>{brand}</span>
                            </label>
                        ))}
                    </div>
                </FilterSection>
            )}

            {/* Price Filter Section */}
            <FilterSection
                title="Price"
                hasActiveFilter={Boolean(filters.minPrice || filters.maxPrice)}
                onReset={() => {
                    setPriceMinInput("");
                    setPriceMaxInput("");
                    onFilterChange({ minPrice: "", maxPrice: "" });
                }}
            >
                <div className="filter-price-presets">
                    <button
                        type="button"
                        className="filter-price-preset-btn"
                        onClick={() => handleQuickPrice("", "50")}
                    >
                        Under $50
                    </button>
                    <button
                        type="button"
                        className="filter-price-preset-btn"
                        onClick={() => handleQuickPrice("50", "100")}
                    >
                        $50 to $100
                    </button>
                    <button
                        type="button"
                        className="filter-price-preset-btn"
                        onClick={() => handleQuickPrice("100", "500")}
                    >
                        $100 to $500
                    </button>
                    <button
                        type="button"
                        className="filter-price-preset-btn"
                        onClick={() => handleQuickPrice("500", "")}
                    >
                        $500 & Above
                    </button>
                </div>

                <form onSubmit={handleApplyPrice} className="filter-price-form">
                    <div className="filter-price-inputs">
                        <div className="filter-price-field">
                            <span className="filter-price-symbol">$</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="Min"
                                value={priceMinInput}
                                onChange={(e) => setPriceMinInput(e.target.value)}
                                aria-label="Minimum Price"
                            />
                        </div>
                        <span className="filter-price-sep">to</span>
                        <div className="filter-price-field">
                            <span className="filter-price-symbol">$</span>
                            <input
                                type="number"
                                min="0"
                                placeholder="Max"
                                value={priceMaxInput}
                                onChange={(e) => setPriceMaxInput(e.target.value)}
                                aria-label="Maximum Price"
                            />
                        </div>
                        <button type="submit" className="filter-price-go-btn">
                            Go
                        </button>
                    </div>
                </form>
            </FilterSection>

            {/* Availability Section */}
            <FilterSection
                title="Availability"
                hasActiveFilter={filters.inStock}
                onReset={() => onFilterChange({ inStock: false })}
            >
                <label className="filter-checkbox-label">
                    <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => onFilterChange({ inStock: e.target.checked })}
                    />
                    <span>Include Out of Stock</span>
                </label>
            </FilterSection>

            {/* Clear All CTA */}
            <div className="filter-sidebar__footer">
                <button
                    type="button"
                    className="filter-sidebar__clear-all-btn"
                    onClick={onClearAll}
                >
                    Clear All Filters
                </button>
                {isOpenMobile && (
                    <button
                        type="button"
                        className="filter-sidebar__apply-btn"
                        onClick={onCloseMobile}
                    >
                        Show {totalResults} Results
                    </button>
                )}
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop / Permanent Panel */}
            <div className="filter-sidebar filter-sidebar--desktop">
                {content}
            </div>

            {/* Mobile / Tablet Drawer */}
            {isOpenMobile && (
                <div className="filter-drawer-overlay" onClick={onCloseMobile} role="dialog" aria-modal="true">
                    <div
                        className="filter-drawer-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {content}
                    </div>
                </div>
            )}
        </>
    );
}

export default FilterSidebar;
