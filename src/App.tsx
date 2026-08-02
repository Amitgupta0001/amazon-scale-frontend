import Header from "./components/layout/Header";
import Hero from "./components/Hero";
import Footer from "./components/layout/Footer";
import "./App.css";

function App() {
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <Hero />
            </main>
            <Footer />
        </div>
    );
}

export default App;