import "./FilterSection.css";
import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSectionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    onReset?: () => void;
    hasActiveFilter?: boolean;
}

export function FilterSection({
    title,
    children,
    defaultOpen = true,
    onReset,
    hasActiveFilter = false,
}: FilterSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="filter-section">
            <div className="filter-section__header">
                <button
                    type="button"
                    className="filter-section__toggle"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-expanded={isOpen}
                >
                    <span className="filter-section__title">{title}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {hasActiveFilter && onReset && (
                    <button
                        type="button"
                        className="filter-section__reset"
                        onClick={onReset}
                        aria-label={`Reset ${title} filter`}
                    >
                        Reset
                    </button>
                )}
            </div>

            {isOpen && <div className="filter-section__body">{children}</div>}
        </div>
    );
}

export default FilterSection;
