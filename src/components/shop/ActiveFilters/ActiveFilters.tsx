import "./ActiveFilters.css";
import { X, RotateCcw } from "lucide-react";

export interface ActiveFilterItem {
    id: string;
    label: string;
    type: "q" | "category" | "brand" | "price" | "inStock";
}

interface ActiveFiltersProps {
    filters: ActiveFilterItem[];
    onRemoveFilter: (type: ActiveFilterItem["type"]) => void;
    onClearAll: () => void;
}

export function ActiveFilters({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) {
    if (filters.length === 0) return null;

    return (
        <div className="active-filters" aria-label="Active Filters">
            <span className="active-filters__label">Active Filters:</span>
            <div className="active-filters__list">
                {filters.map((item) => (
                    <button
                        key={item.id}
                        className="active-filter-chip"
                        onClick={() => onRemoveFilter(item.type)}
                        aria-label={`Remove filter: ${item.label}`}
                    >
                        <span>{item.label}</span>
                        <X size={14} className="active-filter-chip__icon" />
                    </button>
                ))}
            </div>
            <button
                className="active-filters__clear-btn"
                onClick={onClearAll}
                aria-label="Clear all active filters"
            >
                <RotateCcw size={14} />
                <span>Clear All</span>
            </button>
        </div>
    );
}

export default ActiveFilters;
