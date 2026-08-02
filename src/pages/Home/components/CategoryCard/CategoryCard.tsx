import "./CategoryCard.css";
import React from "react";

export interface CategoryCardProps {
    id: string;
    name: string;
    icon: React.ElementType;
    itemCount?: string;
    bgColor?: string;
    onClick?: () => void;
}

function CategoryCard({
    name,
    icon: IconComponent,
    itemCount = "Browse items",
    onClick
}: CategoryCardProps) {
    return (
        <button
            type="button"
            className="category-card"
            onClick={onClick}
            aria-label={`Browse category ${name}`}
        >
            <div className="category-card__icon-wrapper">
                <IconComponent size={28} className="category-card__icon" />
            </div>

            <div className="category-card__content">
                <h3 className="category-card__title">{name}</h3>
                <span className="category-card__count">{itemCount}</span>
            </div>

            <div className="category-card__arrow" aria-hidden="true">
                →
            </div>
        </button>
    );
}

export default CategoryCard;
