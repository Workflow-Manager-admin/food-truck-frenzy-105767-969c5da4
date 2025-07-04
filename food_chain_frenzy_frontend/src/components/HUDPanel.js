import React from "react";
import { COLORS } from "../constants/gameConstants";

// PUBLIC_INTERFACE
/**
 * HUD displays timer, score, combo/streak meter, and rage meter.
 * Appears as a vertical info bar on the left.
 */
function HUDPanel({ timeLeft, score, combo, streak, rage, isFrenzy }) {
  return (
    <div style={{
      background: COLORS.secondary,
      color: COLORS.accent,
      border: `4px solid ${COLORS.primary}`,
      borderRadius: 16,
      padding: "20px 12px",
      minWidth: 140,
      position: "absolute",
      left: 22,
      top: 24,
      zIndex: 6,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      boxShadow: "0 0 24px 2px #fd818833"
    }}>
      <div style={{ fontWeight: 900, fontSize: 20 }}>
        Timer: <span style={{ color: COLORS.primary }}>{timeLeft}s</span>
      </div>
      <div style={{ fontWeight: 900, fontSize: 20 }}>
        Score: <span style={{ color: COLORS.primary }}>{score}</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: 16 }}>
        Combo: <span style={{ color: isFrenzy ? "#ff2121" : COLORS.primary }}>{combo}</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: 16 }}>
        Streak: <span style={{ color: COLORS.primary }}>{streak}</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: 16 }}>
        Rage: <span style={{ color: rage > 60 ? "#ff0000" : COLORS.primary }}>{rage}</span>
      </div>
      {isFrenzy && (
        <div style={{
          background: "#ffe45e",
          color: COLORS.accent,
          fontWeight: 900,
          padding: "4px 12px",
          borderRadius: 8,
          marginTop: 8,
          fontSize: 18,
          animation: "wiggle 0.2s infinite alternate"
        }}>
          FRENZY!
        </div>
      )}
    </div>
  );
}

export default HUDPanel;
