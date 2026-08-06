import "./SortDropdown.css";
import { ArrowUpDown } from "lucide-react";

export type SortOption =
    | "relevance"
    | "priceAsc"
    | "priceDesc"
    | "nameAsc"
    | "nameDesc"
    | "newest";

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
    return (
        <div className="sort-dropdown">
            <label htmlFor="sort-select" className="sort-dropdown__label">
                <ArrowUpDown size={15} className="sort-dropdown__icon" />
                <span>Sort by:</span>
            </label>
            <select
                id="sort-select"
                className="sort-dropdown__select"
                value={value}
                onChange={(e) => onChange(e.target.value as SortOption)}
                aria-label="Sort products by"
            >
                <option value="relevance">Featured / Featured Relevance</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="nameAsc">Name: A to Z</option>
                <option value="nameDesc">Name: Z to A</option>
                <option value="newest">Newest Arrivals</option>
            </select>
        </div>
    );
}

export default SortDropdown;
