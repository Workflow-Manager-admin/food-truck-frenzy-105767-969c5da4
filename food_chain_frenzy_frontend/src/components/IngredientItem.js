import React from "react";
import { COLORS } from "../constants/gameConstants";

// PUBLIC_INTERFACE
/**
 * Renders an ingredient item, animated, draggable, click-to-collect.
 */
function IngredientItem({ type, x = 0, y = 0, onCollect, draggable = true }) {
  // Show as cartoon w/ hover, drag, and "splat" on collect
  // Optionally use image API for real images
  return (
    <div
      className="ingredient-item"
      onClick={onCollect}
      draggable={draggable}
      onDragStart={e => {
        e.dataTransfer.setData("text/plain", type.name);
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 60,
        height: 60,
        borderRadius: 20,
        background: `radial-gradient(circle, ${type.color} 70%, ${COLORS.secondary} 100%)`,
        border: `3px solid ${COLORS.accent}`,
        boxShadow: `0 3px 24px 0px ${type.color}55`,
        color: COLORS.accent,
        fontWeight: 900,
        fontSize: 18,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: draggable ? "grab" : "not-allowed",
        zIndex: 6,
        animation: "floaty 1.7s infinite alternate cubic-bezier(.7,-0.2,.3,1.4)"
      }}
      tabIndex={0}
      aria-label={type.name}
    >
      {/* Optional: insert cartoon icon or API image */}
      <span role="img" aria-label={type.name}>
        {type.name[0]}
      </span>
    </div>
  );
}

export default IngredientItem;
