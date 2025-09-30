import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const toggleTheme = () => {
    if (isFlipping) return; // bloqueia cliques durante animação
    setIsFlipping(true);
  };

  useEffect(() => {
    if (isFlipping) {
      // Trocar o tema no meio da animação (400ms)
      const flipMidpoint = setTimeout(() => {
        setIsDark(prev => !prev);
      }, 400);

      // Finalizar a animação (800ms)
      const flipEnd = setTimeout(() => {
        setIsFlipping(false);
      }, 800);

      return () => {
        clearTimeout(flipMidpoint);
        clearTimeout(flipEnd);
      };
    }
  }, [isFlipping]);

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <header className="header">
        <div className="theme-toggle" onClick={toggleTheme}>
          <div className={`toggle-thumb ${isDark ? 'dark' : 'light'}`}>
            {isDark ? '🌙' : '🌞'}
          </div>
        </div>
      </header>

      <main className="main">
        <h1>Minha Tela</h1>
        <p>Conteúdo aqui...</p>
      </main>

      {/* Carta que cobre a tela */}
      {isFlipping && (
        <div className={`card-overlay ${isFlipping ? 'flipping' : ''}`}>
          <div className="card">
            <div className="card-back" />
            <div className={`card-front ${isDark ? 'dark' : 'light'}`}>
              {isDark ? '♠ A' : '♥ A'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
