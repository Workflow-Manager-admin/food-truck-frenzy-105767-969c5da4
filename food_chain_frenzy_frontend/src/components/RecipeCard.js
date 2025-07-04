import React from "react";
import { COLORS } from "../constants/gameConstants";

// PUBLIC_INTERFACE
/**
 * RecipeCard: Visual display for current recipe goal(s), pop-up window for recipe tutorial
 */
function RecipeCard({ recipe, onClose, showTutorial }) {
  if (!recipe) return null;

  return (
    <div style={{
      position: "fixed",
      left: showTutorial ? "50%" : "10px",
      top: showTutorial ? "52%" : "120px",
      transform: showTutorial ? "translate(-50%,-50%) scale(1.05)" : "none",
      background: showTutorial ? COLORS.primary : COLORS.secondary,
      border: `4px solid ${COLORS.accent}`,
      borderRadius: 24,
      zIndex: 40,
      padding: showTutorial ? "30px 46px" : "16px 24px",
      minWidth: 246,
      boxShadow: "0 2px 32px 5px #fd8188aa",
      textAlign: "left"
    }}>
      <div style={{ fontWeight: 900, fontSize: 22, color: COLORS.accent, marginBottom: 5 }}>{recipe.name}</div>
      <ol style={{
        margin: 0, padding: "0 0 0 18px", fontWeight: 700, fontSize: 16
      }}>
        {recipe.ingredients.map((i, idx) => (
          <li key={idx} style={{ color: "#e87a41", textShadow: "1px 1px #fffefa60" }}>{i}</li>
        ))}
      </ol>
      {showTutorial && (
        <>
          <div style={{ fontWeight: 700, fontSize: 16, marginTop: 15, color: "#1a1a1a" }}>
            Drag or click the matching ingredients flying in on the conveyor!
            Complete the stack as shown.
          </div>
          <button onClick={onClose} style={{
            background: COLORS.accent,
            color: COLORS.secondary,
            fontWeight: 800,
            fontSize: 15,
            padding: "8px 18px",
            marginTop: 20,
            borderRadius: 10,
            border: "none",
            cursor: "pointer"
          }}>
            Start Cooking!
          </button>
        </>
      )}
    </div>
  );
}

export default RecipeCard;
