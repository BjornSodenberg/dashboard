import './App.css'
import Dashboard from "./components/Dashboard.jsx";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./Home.jsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* Главная страница */}
                <Route path="/" element={<Home />} />

                {/* Страница дашборда */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Можно добавить 404 */}
                <Route path="*" element={<div>Страница не найдена</div>} />
            </Routes>
        </Router>
    );
}

export default App
