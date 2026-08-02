import "./CategoryGrid.css";
import CategoryCard from "../CategoryCard";
import {
    Tv,
    Shirt,
    Home as HomeIcon,
    Sparkles,
    Gamepad2,
    BookOpen,
    Dumbbell,
    ShoppingBag
} from "lucide-react";

const CATEGORIES = [
    { id: "electronics", name: "Electronics", icon: Tv, itemCount: "10,000+ Items" },
    { id: "fashion", name: "Fashion", icon: Shirt, itemCount: "25,000+ Items" },
    { id: "home", name: "Home & Kitchen", icon: HomeIcon, itemCount: "15,000+ Items" },
    { id: "beauty", name: "Beauty & Personal", icon: Sparkles, itemCount: "8,000+ Items" },
    { id: "gaming", name: "Gaming", icon: Gamepad2, itemCount: "5,000+ Items" },
    { id: "books", name: "Books & Media", icon: BookOpen, itemCount: "50,000+ Items" },
    { id: "sports", name: "Sports & Outdoors", icon: Dumbbell, itemCount: "12,000+ Items" },
    { id: "grocery", name: "Grocery & Gourmet", icon: ShoppingBag, itemCount: "18,000+ Items" },
];

function CategoryGrid() {
    return (
        <section className="category-grid-section" aria-labelledby="category-grid-heading">
            <div className="category-grid-section__header">
                <h2 id="category-grid-heading" className="category-grid-section__title">
                    Shop by Category
                </h2>
                <span className="category-grid-section__subtitle">
                    Explore our extensive catalog of premium products
                </span>
            </div>

            <div className="category-grid-section__grid">
                {CATEGORIES.map((category) => (
                    <CategoryCard
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        icon={category.icon}
                        itemCount={category.itemCount}
                    />
                ))}
            </div>
        </section>
    );
}

export default CategoryGrid;
