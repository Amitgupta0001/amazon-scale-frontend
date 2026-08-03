import "./App.css";

import AppProviders from "./providers";
import AppRoutes from "./AppRoutes";

function App() {
    return (
        <AppProviders>
            <AppRoutes />
        </AppProviders>
    );
}

export default App;