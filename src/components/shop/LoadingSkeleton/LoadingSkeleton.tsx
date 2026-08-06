import "./LoadingSkeleton.css";

interface LoadingSkeletonProps {
    count?: number;
}

export function LoadingSkeleton({ count = 8 }: LoadingSkeletonProps) {
    return (
        <div className="skeleton-grid" role="status" aria-label="Loading products">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="skeleton-card">
                    <div className="skeleton-image skeleton-pulse" />
                    <div className="skeleton-content">
                        <div className="skeleton-badge skeleton-pulse" />
                        <div className="skeleton-title skeleton-pulse" />
                        <div className="skeleton-subtitle skeleton-pulse" />
                        <div className="skeleton-price skeleton-pulse" />
                        <div className="skeleton-button skeleton-pulse" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LoadingSkeleton;
