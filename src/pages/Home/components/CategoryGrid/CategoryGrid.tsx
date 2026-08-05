import "./CategoryGrid.css";
import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard";
import categoryService from "../../../../services/category/categoryService";
import type { CategoryResponse } from "../../../../types/api";
import {
    Tv,
    Shirt,
    Home as HomeIcon,
    Sparkles,
    Gamepad2,
    BookOpen,
    Dumbbell,
    ShoppingBag,
    Package
} from "lucide-react";

const ICON_MAP: Record<string, typeof Tv> = {
    electronics: Tv,
    fashion: Shirt,
    home: HomeIcon,
    beauty: Sparkles,
    gaming: Gamepad2,
    books: BookOpen,
    sports: Dumbbell,
    grocery: ShoppingBag,
};

function CategoryGrid() {
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        categoryService.getAllCategories()
            .then((data) => {
                if (isMounted) {
                    setCategories(data);
                }
            })
            .catch(() => {
                // Graceful fallback if backend has no data or network issue
            })
            .finally(() => {
                if (isMounted) setIsLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const displayCategories = categories.length > 0
        ? categories.map((cat) => ({
            id: String(cat.id),
            name: cat.name,
            icon: ICON_MAP[cat.name.toLowerCase()] || Package,
            itemCount: cat.description || "Category",
        }))
        : [
            { id: "electronics", name: "Electronics", icon: Tv, itemCount: "Top Electronics" },
            { id: "fashion", name: "Fashion", icon: Shirt, itemCount: "Trendy Outfits" },
            { id: "home", name: "Home & Kitchen", icon: HomeIcon, itemCount: "Home Essentials" },
            { id: "beauty", name: "Beauty & Personal", icon: Sparkles, itemCount: "Care Products" },
            { id: "gaming", name: "Gaming", icon: Gamepad2, itemCount: "Gaming Gear" },
            { id: "books", name: "Books & Media", icon: BookOpen, itemCount: "Reading List" },
            { id: "sports", name: "Sports & Outdoors", icon: Dumbbell, itemCount: "Fitness Essentials" },
            { id: "grocery", name: "Grocery & Gourmet", icon: ShoppingBag, itemCount: "Daily Supplies" },
        ];

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

            {isLoading ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-secondary, #666)" }}>
                    Loading categories...
                </div>
            ) : (
                <div className="category-grid-section__grid">
                    {displayCategories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            id={category.id}
                            name={category.name}
                            icon={category.icon}
                            itemCount={category.itemCount}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default CategoryGrid;
