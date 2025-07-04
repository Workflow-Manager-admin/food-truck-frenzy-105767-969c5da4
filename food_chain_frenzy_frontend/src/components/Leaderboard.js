import React from "react";
import { COLORS } from "../constants/gameConstants";

/**
 * Leaderboard: shows daily/weekly high scores (locally stored + can sync from Firebase).
 */
function Leaderboard({ leaderboard = [], highlightScore }) {
  return (
    <div style={{
      background: COLORS.primary,
      color: COLORS.accent,
      border: `5px solid ${COLORS.accent}`,
      borderRadius: 24,
      minHeight: 220,
      minWidth: 220,
      padding: "16px 20px",
      position: "absolute",
      right: 24,
      top: 270,
      zIndex: 6,
      boxShadow: "0 0 20px 2px #d33a5dd7"
    }}>
      <div style={{ fontWeight: 800, fontSize: 24, marginBottom: 8, color: COLORS.secondary }}>Leaderboard</div>
      <ol style={{ margin: 0, padding: 0 }}>
        {leaderboard.slice(0, 7).map((item, idx) => (
          <li key={idx} style={{
            marginBottom: 8,
            fontSize: 18,
            color: item.score === highlightScore ? "#ffe45e" : COLORS.secondary,
            fontWeight: item.score === highlightScore ? 900 : 700,
            background: item.score === highlightScore ? "#ff932017" : "none",
            borderRadius: 7
          }}>
            <span style={{ fontWeight: 800 }}>{item.name}</span> &mdash; <span>{item.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default Leaderboard;
