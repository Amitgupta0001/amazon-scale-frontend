import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import "./App.css";

function App() {
    return (
        <div className="app">
            <Header />
            <main className="app__main">
                <Home />
            </main>
            <Footer />
        </div>
    );
}

export default App;