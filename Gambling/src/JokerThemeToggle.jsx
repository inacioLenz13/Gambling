import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CardAnimation.css";

export default function JokerThemeToggle() {
  const [dark, setDark] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [phase, setPhase] = useState(0);

  const naipes = ["♠", "♣", "♥", "♦"];

  const startAnimation = () => {
    setAnimating(true);
    setPhase(0);

    // fase 1: cartas empilhadas
    setTimeout(() => setPhase(1), 500); // fase 2: abrir leque
  };

  const handleAdvanceComplete = () => {
    setDark(prev => !prev); // troca de tema
    setAnimating(false);    // cartas somem
  };

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <button onClick={startAnimation} className="toggle-btn">
        Mudar Tema 🎭
      </button>

      <AnimatePresence>
        {animating && (
          <div className="card-fan">
            {naipes.map((naipe, index) => (
              <motion.div
                key={naipe}
                className={`joker-card ${dark ? "dark-card" : "light-card"}`}
                data-suit={naipe}
                animate={{
                  rotate: phase === 1 ? -15 + index * 10 : 0,
                  x: phase === 1 ? -90 + index * 60 : 0,
                  y: phase === 1 ? 0 : 0,
                  scale: phase === 2 ? 20 : 1, // faz a carta crescer para cobrir a tela
                  x: phase === 2 ? 0 : (-90 + index * 60),
                  y: phase === 2 ? 0 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: phase === 2 ? index * 0.05 : index * 0.1,
                }}
                onAnimationComplete={() => {
                  if (phase === 1 && index === naipes.length - 1) {
                    setTimeout(() => setPhase(2), 300); // fase 3: avançar cartas
                  }
                  if (phase === 2 && index === naipes.length - 1) {
                    handleAdvanceComplete();
                  }
                }}
              >
                <div className="card-front">
                  <div className="card-top-left">
                    A<div className="mini-symbol">{naipe}</div>
                  </div>
                  <div className="card-symbol">{naipe}</div>
                  <div className="card-bottom-right">
                    A<div className="mini-symbol">{naipe}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
