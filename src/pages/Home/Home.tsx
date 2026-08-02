import "./Home.css";
import Hero from "./components/Hero";
import CategoryGrid from "./components/CategoryGrid";
import FeaturedProducts from "./components/FeaturedProducts";
import DealsSection from "./components/DealsSection";
import Recommendations from "./components/Recommendations";

function Home() {
    return (
        <div className="home-page">
            <Hero />
            <CategoryGrid />
            <FeaturedProducts />
            <DealsSection />
            <Recommendations />
        </div>
    );
}

export default Home;
