import React, { useEffect, useState } from "react";
import { CUSTOMER_MOODS, COLORS } from "../constants/gameConstants";

// PUBLIC_INTERFACE
/**
 * Animated queue of cartoonish customers w/ dynamic moods.
 * Customers at front get impatient if not served!
 */
function CustomerQueue({ queueSize = 5, currentMood }) {
  const [moods, setMoods] = useState(Array(queueSize).fill("waiting"));

  // Randomize some moods (simulate impatience/excitement)
  useEffect(() => {
    const id = setInterval(() => {
      setMoods(arr =>
        arr.map((mood, idx) =>
          idx === 0 && currentMood !== undefined
            ? currentMood
            : Math.random() > 0.6
            ? "impatient"
            : "waiting"
        )
      );
    }, 1900);
    return () => clearInterval(id);
  }, [currentMood]);

  return (
    <div
      style={{
        width: "96%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
        padding: "10px 0 0 0"
      }}
    >
      {moods.map((moodKey, i) => {
        const m = CUSTOMER_MOODS.find(m => m.key === moodKey);
        return (
          <div key={i}
            style={{
              width: 60,
              height: 74,
              borderRadius: 34,
              background: `linear-gradient(180deg, ${
                i === 0
                  ? COLORS.primary
                  : COLORS.secondary
              } 60%, #fff 100%)`,
              border: `4px solid ${COLORS.accent}`,
              margin: "0 10px",
              boxShadow: `0 0 16px 2px ${COLORS.primary}30`,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              position: "relative"
            }}
          >
            <span style={{
              fontSize: 36 + i * 2,
              transform: i === 0 ? "scale(1.3)" : "scale(1)",
              filter: i === 0 && moodKey === "impatient" ? "hue-rotate(50deg)" : "none"
            }}>{m?.face || "🙂"}</span>
            <span style={{
              position: "absolute",
              top: 6,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.accent,
              background: "#fffefa",
              borderRadius: 4,
              padding: "2px 4px",
              opacity: 0.6,
              zIndex: 3
            }}>{m?.label || "?"}</span>
          </div>
        );
      })}
    </div>
  );
}

export default CustomerQueue;
