import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import FileUpload from './pages/FileUpload';
import AdminRules from './pages/AdminRules';

function App() {
  return (
    <Router>
      <div id="root">
        {/* Navegación Minimalista */}
        <nav className="flex justify-center gap-8 p-6 border-b border-border-main bg-bg-main">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-accent' : 'text-text-main hover:text-accent'}`
            }
          >
            Analizador
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-sm font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-accent' : 'text-text-main hover:text-accent'}`
            }
          >
            Reglas Cabot
          </NavLink>
        </nav>

        {/* Contenido Principal */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="/admin" element={<AdminRules />} />
          </Routes>
        </main>

        <footer className="p-6 text-center text-xs opacity-40 border-t border-border-main">
          Cabot Invoice Auditor &copy; 2026
        </footer>
      </div>
    </Router>
  );
}

export default App;