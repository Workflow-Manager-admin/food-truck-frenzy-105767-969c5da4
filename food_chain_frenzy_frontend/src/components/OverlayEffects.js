import React from "react";
import { COLORS } from "../constants/gameConstants";

// PUBLIC_INTERFACE
/**
 * OverlayEffects: Displays animated overlays for Game Over or Frenzy Mode activation.
 */
function OverlayEffects({ state, onRestart }) {
  // Game Over Overlay
  if (state.gameOver) {
    return (
      <div style={{
        position: "fixed",
        left: 0, top: 0, width: "100vw", height: "100vh",
        zIndex: 99, background: "#fd8188cc",
        color: "#111",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <div style={{
          fontSize: 60,
          fontWeight: 900,
          color: "#111",
          textShadow: "2px 2px 16px #fffefa"
        }}>Game Over!</div>
        <div style={{ fontSize: 32, color: "#fffefa", margin: 18 }}>
          Final Score: {state.score}
        </div>
        <button style={{
          background: COLORS.accent,
          color: COLORS.secondary,
          fontWeight: 700, fontSize: 18,
          borderRadius: 15, padding: "10px 30px", border: "none",
          marginTop: 24, cursor: "pointer"
        }} onClick={onRestart}>
          Play Again
        </button>
      </div>
    );
  }
  // Frenzy Mode Overlay
  if (state.isFrenzy) {
    return (
      <div style={{
        position: "fixed",
        left: 0, top: 0, width: "100vw", height: "100vh",
        zIndex: 70, pointerEvents: "none",
        background: "radial-gradient(circle at 55% 55%, #ffe45e55 0%, #fd818840 70%,transparent 100%)",
        mixBlendMode: "multiply",
        animation: "pulse 1.5s infinite alternate"
      }}>
        <div style={{
          fontSize: 50, fontWeight: 800, color: "#fd8188", position: "absolute",
          left: "50%", top: "35%", transform: "translate(-50%,-50%)",
          opacity: 0.93,
          textShadow: "1px 1px 10px #fffefa80"
        }}>
          FIRE FRENZY!
        </div>
      </div>
    );
  }

  return null;
}

export default OverlayEffects;
