import React from "react";
import { BADGES, COLORS } from "../constants/gameConstants";

/**
 * Renders the badge/achievement board as icons in a right-hand panel.
 * Badges darken if locked, pop with animation if unlocked.
 */
function BadgeBoard({ unlocked = [] }) {
  return (
    <div style={{
      background: COLORS.secondary,
      color: COLORS.accent,
      border: `5px solid ${COLORS.primary}`,
      borderRadius: 24,
      minHeight: 260,
      minWidth: 130,
      padding: "16px 14px",
      position: "absolute",
      right: 24,
      top: 26,
      zIndex: 7,
      boxShadow: "0 0 18px 2px #fd818877"
    }}>
      <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, color: COLORS.primary }}>Badges</div>
      <div style={{
        display: "flex", flexDirection: "column", gap: 12, alignItems: "center"
      }}>
        {BADGES.map((b, i) => {
          const unlockedBadge = unlocked.includes(b.key);
          return (
            <div key={b.key}
              style={{
                fontSize: 32,
                padding: 7,
                borderRadius: "50%",
                background: unlockedBadge ? "#ffe45e" : COLORS.secondary,
                filter: unlockedBadge ? "none" : "grayscale(0.7) opacity(0.45)",
                boxShadow: unlockedBadge ? "0 0 10px #ffd02f" : "none",
                fontWeight: 900,
                transition: "all 0.3s"
              }}
              title={b.desc}
            >
              {b.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default BadgeBoard;
