import './App.css'
import Dashboard from "./components/Dashboard.jsx";

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
                Публичный дашборд проекта
            </header>
            <main className="py-8">
                <Dashboard />
            </main>
        </div>
    );
}

export default App
