import "./Products.css";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, PackageX, RefreshCw, CheckCircle } from "lucide-react";
import productService from "../../services/product/productService";
import categoryService from "../../services/category/categoryService";
import cartService from "../../services/cart/cartService";
import type { ProductResponse, CategoryResponse } from "../../types/api";
import ProductCard, { type Product } from "../Home/components/ProductCard";
import FilterSidebar, { type FilterState } from "../../components/shop/FilterSidebar";
import SortDropdown, { type SortOption } from "../../components/shop/SortDropdown";
import ActiveFilters, { type ActiveFilterItem } from "../../components/shop/ActiveFilters";
import LoadingSkeleton from "../../components/shop/LoadingSkeleton";
import Pagination from "../../components/shop/Pagination";

const ITEMS_PER_PAGE = 8;

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState<ProductResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);

    // Read URL Search Parameters
    const qParam = searchParams.get("q") || "";
    const categoryParam = searchParams.get("category") || "all";
    const brandParam = searchParams.get("brand") || "all";
    const minPriceParam = searchParams.get("minPrice") || "";
    const maxPriceParam = searchParams.get("maxPrice") || "";
    const inStockParam = searchParams.get("inStock") === "true";
    const sortParam = (searchParams.get("sort") as SortOption) || "relevance";
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

    // Fetch products and categories from backend Spring Boot APIs
    useEffect(() => {
        let isMounted = true;
        Promise.all([
            productService.getAllProducts(),
            categoryService.getAllCategories(),
        ])
            .then(([productData, categoryData]) => {
                if (isMounted) {
                    setProducts(productData);
                    setCategories(categoryData);
                    setIsLoading(false);
                }
            })
            .catch((err: unknown) => {
                if (isMounted) {
                    const msg = err instanceof Error ? err.message : "Failed to load shop catalog from backend server.";
                    setError(msg);
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const handleRetry = () => {
        setIsLoading(true);
        setError(null);
        Promise.all([
            productService.getAllProducts(),
            categoryService.getAllCategories(),
        ])
            .then(([productData, categoryData]) => {
                setProducts(productData);
                setCategories(categoryData);
            })
            .catch((err: unknown) => {
                const msg = err instanceof Error ? err.message : "Failed to load shop catalog from backend server.";
                setError(msg);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Available brands extracted dynamically from products
    const availableBrands = useMemo(() => {
        const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));
        return brands.sort();
    }, [products]);

    // Helper to update URL search params
    const updateQueryParams = useCallback((updates: Record<string, string | null>) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            Object.entries(updates).forEach(([key, val]) => {
                if (val === null || val === "" || val === "all" || (key === "page" && val === "1") || (key === "sort" && val === "relevance") || (key === "inStock" && val === "false")) {
                    next.delete(key);
                } else {
                    next.set(key, val);
                }
            });
            return next;
        });
    }, [setSearchParams]);

    // Handler for filter changes
    const handleFilterChange = (newFilters: Partial<FilterState>) => {
        const updates: Record<string, string | null> = { page: "1" }; // Reset to page 1 on filter edit

        if ("category" in newFilters) updates.category = newFilters.category || "all";
        if ("brand" in newFilters) updates.brand = newFilters.brand || "all";
        if ("minPrice" in newFilters) updates.minPrice = newFilters.minPrice || "";
        if ("maxPrice" in newFilters) updates.maxPrice = newFilters.maxPrice || "";
        if ("inStock" in newFilters) updates.inStock = newFilters.inStock ? "true" : "false";

        updateQueryParams(updates);
    };

    const handleSortChange = (newSort: SortOption) => {
        updateQueryParams({ sort: newSort, page: "1" });
    };

    const handlePageChange = (newPage: number) => {
        updateQueryParams({ page: String(newPage) });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleClearAllFilters = () => {
        setSearchParams(new URLSearchParams());
    };

    const handleRemoveFilter = (type: ActiveFilterItem["type"]) => {
        if (type === "q") updateQueryParams({ q: null, page: "1" });
        if (type === "category") updateQueryParams({ category: null, page: "1" });
        if (type === "brand") updateQueryParams({ brand: null, page: "1" });
        if (type === "price") updateQueryParams({ minPrice: null, maxPrice: null, page: "1" });
        if (type === "inStock") updateQueryParams({ inStock: null, page: "1" });
    };

    // Filtered & Sorted products list computation
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            // Search Query Filter
            if (qParam.trim()) {
                const term = qParam.trim().toLowerCase();
                const matchesName = p.name.toLowerCase().includes(term);
                const matchesBrand = p.brand.toLowerCase().includes(term);
                const matchesDesc = p.description.toLowerCase().includes(term);
                if (!matchesName && !matchesBrand && !matchesDesc) return false;
            }

            // Category Filter
            if (categoryParam !== "all") {
                // If brand matches categoryParam or description contains categoryParam
                const matchCategoryName = categoryParam.toLowerCase();
                const isBrandMatch = p.brand.toLowerCase().includes(matchCategoryName);
                const isNameMatch = p.name.toLowerCase().includes(matchCategoryName);
                const isDescMatch = p.description.toLowerCase().includes(matchCategoryName);
                if (!isBrandMatch && !isNameMatch && !isDescMatch) return false;
            }

            // Brand Filter
            if (brandParam !== "all" && p.brand !== brandParam) {
                return false;
            }

            // Price Min Filter
            if (minPriceParam) {
                const min = parseFloat(minPriceParam);
                if (!isNaN(min) && p.price < min) return false;
            }

            // Price Max Filter
            if (maxPriceParam) {
                const max = parseFloat(maxPriceParam);
                if (!isNaN(max) && p.price > max) return false;
            }

            // In Stock Filter
            if (inStockParam && (p.stock <= 0 || !p.active)) {
                return false;
            }

            return true;
        });
    }, [products, qParam, categoryParam, brandParam, minPriceParam, maxPriceParam, inStockParam]);

    // Sorted products computation
    const sortedProducts = useMemo(() => {
        const list = [...filteredProducts];
        switch (sortParam) {
            case "priceAsc":
                return list.sort((a, b) => a.price - b.price);
            case "priceDesc":
                return list.sort((a, b) => b.price - a.price);
            case "nameAsc":
                return list.sort((a, b) => a.name.localeCompare(b.name));
            case "nameDesc":
                return list.sort((a, b) => b.name.localeCompare(a.name));
            case "newest":
                return list.sort((a, b) => Number(b.id) - Number(a.id));
            case "relevance":
            default:
                return list;
        }
    }, [filteredProducts, sortParam]);

    // Pagination slicing
    const totalItems = sortedProducts.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedProducts, currentPage]);

    // Active filters array for chips display
    const activeFiltersList = useMemo(() => {
        const items: ActiveFilterItem[] = [];
        if (qParam) {
            items.push({ id: "q", label: `Search: "${qParam}"`, type: "q" });
        }
        if (categoryParam !== "all") {
            items.push({ id: "cat", label: `Category: ${categoryParam}`, type: "category" });
        }
        if (brandParam !== "all") {
            items.push({ id: "brand", label: `Brand: ${brandParam}`, type: "brand" });
        }
        if (minPriceParam || maxPriceParam) {
            const minStr = minPriceParam ? `$${minPriceParam}` : "$0";
            const maxStr = maxPriceParam ? `$${maxPriceParam}` : "Any";
            items.push({ id: "price", label: `Price: ${minStr} - ${maxStr}`, type: "price" });
        }
        if (inStockParam) {
            items.push({ id: "stock", label: "Include Out of Stock", type: "inStock" });
        }
        return items;
    }, [qParam, categoryParam, brandParam, minPriceParam, maxPriceParam, inStockParam]);

    const handleAddToCart = async (product: Product) => {
        try {
            await cartService.addItemToCart({
                productId: Number(product.id),
                quantity: 1,
            });
            setNotification(`Added "${product.name}" to cart!`);
            setTimeout(() => setNotification(null), 3000);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Could not add to cart";
            setNotification(`Cart error: ${msg}`);
            setTimeout(() => setNotification(null), 4000);
        }
    };

    const currentFilterState: FilterState = {
        category: categoryParam,
        brand: brandParam,
        minPrice: minPriceParam,
        maxPrice: maxPriceParam,
        inStock: inStockParam,
    };

    return (
        <main className="shop-page" id="shop-main-content">
            <div className="shop-container">
                {/* Header Banner */}
                <header className="shop-header">
                    <div className="shop-header__title-group">
                        <h1 id="shop-page-title" className="shop-header__title">
                            Product Catalog & Search
                        </h1>
                        <p className="shop-header__subtitle">
                            Explore our full range of products backed by AmazonScale REST APIs
                        </p>
                    </div>

                    <div className="shop-header__actions">
                        <button
                            type="button"
                            className="shop-header__filter-toggle-btn"
                            onClick={() => setMobileFilterOpen(true)}
                            aria-label="Open Filter Options"
                        >
                            <SlidersHorizontal size={18} />
                            <span>Filters</span>
                            {activeFiltersList.length > 0 && (
                                <span className="shop-header__filter-badge">{activeFiltersList.length}</span>
                            )}
                        </button>

                        <SortDropdown value={sortParam} onChange={handleSortChange} />
                    </div>
                </header>

                {/* Toast Notification */}
                {notification && (
                    <div className="shop-notification" role="status">
                        <CheckCircle size={18} />
                        <span>{notification}</span>
                    </div>
                )}

                {/* Active Filter Chips */}
                <ActiveFilters
                    filters={activeFiltersList}
                    onRemoveFilter={handleRemoveFilter}
                    onClearAll={handleClearAllFilters}
                />

                <div className="shop-layout">
                    {/* Filter Sidebar */}
                    <FilterSidebar
                        categories={categories}
                        availableBrands={availableBrands}
                        filters={currentFilterState}
                        onFilterChange={handleFilterChange}
                        onClearAll={handleClearAllFilters}
                        isOpenMobile={mobileFilterOpen}
                        onCloseMobile={() => setMobileFilterOpen(false)}
                        totalResults={totalItems}
                    />

                    {/* Main Results Grid */}
                    <section className="shop-results" aria-label="Product Search Results">
                        {isLoading ? (
                            <LoadingSkeleton count={ITEMS_PER_PAGE} />
                        ) : error ? (
                            <div className="shop-error-state">
                                <PackageX size={48} className="shop-error-icon" />
                                <h2>Failed to Load Products</h2>
                                <p>{error}</p>
                                <button type="button" className="shop-retry-btn" onClick={handleRetry}>
                                    <RefreshCw size={16} />
                                    <span>Retry Request</span>
                                </button>
                            </div>
                        ) : totalItems === 0 ? (
                            <div className="shop-empty-state">
                                <PackageX size={48} className="shop-empty-icon" />
                                <h2>No Products Found</h2>
                                <p>We couldn't find any products matching your search criteria.</p>
                                <button
                                    type="button"
                                    className="shop-clear-filters-cta"
                                    onClick={handleClearAllFilters}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="shop-results-info">
                                    <span>
                                        Showing <strong>{paginatedProducts.length}</strong> of <strong>{totalItems}</strong> items
                                        {qParam && <> for "<strong>{qParam}</strong>"</>}
                                    </span>
                                </div>

                                <div className="shop-products-grid">
                                    {paginatedProducts.map((p) => {
                                        const mappedProduct: Product = {
                                            id: String(p.id),
                                            name: p.name,
                                            category: p.brand || "General",
                                            price: p.price,
                                            rating: 4.8,
                                            reviewCount: p.stock * 5,
                                            imageUrl: p.imageUrl,
                                            badge: p.active ? "Active" : "Inactive",
                                            inStock: p.stock > 0 && p.active,
                                        };
                                        return (
                                            <ProductCard
                                                key={p.id}
                                                product={mappedProduct}
                                                onAddToCart={handleAddToCart}
                                            />
                                        );
                                    })}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalItems={totalItems}
                                    itemsPerPage={ITEMS_PER_PAGE}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
}

export default Products;
