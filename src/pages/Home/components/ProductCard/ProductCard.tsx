import "./ProductCard.css";
import { Star, ShoppingCart, Check } from "lucide-react";

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    imageUrl?: string;
    badge?: string;
    isDeal?: boolean;
    discountPercent?: number;
    inStock?: boolean;
}

export interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const {
        name,
        category,
        price,
        originalPrice,
        rating,
        reviewCount,
        badge,
        discountPercent,
        inStock = true
    } = product;

    return (
        <article className="product-card">
            <div className="product-card__image-container">
                {badge && (
                    <span className="product-card__badge product-card__badge--highlight">
                        {badge}
                    </span>
                )}
                {discountPercent && !badge && (
                    <span className="product-card__badge product-card__badge--deal">
                        {discountPercent}% OFF
                    </span>
                )}

                <div className="product-card__image-placeholder" aria-hidden="true">
                    <span className="product-card__image-icon">📦</span>
                    <span className="product-card__image-cat">{category}</span>
                </div>
            </div>

            <div className="product-card__content">
                <span className="product-card__category">{category}</span>

                <h3 className="product-card__title" title={name}>
                    {name}
                </h3>

                <div className="product-card__rating" aria-label={`Rating ${rating} out of 5 stars from ${reviewCount} reviews`}>
                    <div className="product-card__stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={14}
                                className={
                                    star <= Math.floor(rating)
                                        ? "product-card__star product-card__star--filled"
                                        : star - rating < 1
                                        ? "product-card__star product-card__star--half"
                                        : "product-card__star"
                                }
                            />
                        ))}
                    </div>
                    <span className="product-card__rating-value">{rating.toFixed(1)}</span>
                    <span className="product-card__review-count">({reviewCount})</span>
                </div>

                <div className="product-card__price-row">
                    <div className="product-card__price-group">
                        <span className="product-card__price">${price.toFixed(2)}</span>
                        {originalPrice && originalPrice > price && (
                            <s className="product-card__original-price">
                                ${originalPrice.toFixed(2)}
                            </s>
                        )}
                    </div>

                    {inStock ? (
                        <span className="product-card__stock">
                            <Check size={12} /> Prime Delivery
                        </span>
                    ) : (
                        <span className="product-card__stock product-card__stock--out">
                            Out of Stock
                        </span>
                    )}
                </div>

                <button
                    type="button"
                    className="product-card__add-btn"
                    onClick={() => onAddToCart?.(product)}
                    aria-label={`Add ${name} to cart`}
                >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                </button>
            </div>
        </article>
    );
}

export default ProductCard;
