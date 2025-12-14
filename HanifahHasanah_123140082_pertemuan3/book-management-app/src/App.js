import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="nav-container">
              <h1 className="nav-logo">📚 Aplikasi Buku Saya</h1>
              <ul className="nav-menu">
                <li>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/stats" className="nav-link">
                    Statistik
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stats" element={<Stats />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>Hanifah Hasanah - 123140082 - Praktikum React</p>
          </footer>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;