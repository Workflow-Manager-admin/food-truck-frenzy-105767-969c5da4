import React, { useEffect, useRef, useState } from "react";
import { INGREDIENTS, KITCHEN_ROWS, KITCHEN_COLS, COLORS } from "../constants/gameConstants";
import { useGame } from "../context/GameContext";
import IngredientItem from "./IngredientItem";

// PUBLIC_INTERFACE
/**
 * Animated 2D food truck kitchen & conveyor system.
 * Handles ingredient spawns on conveyors and drag/click collect.
 * Includes fun cartoon motion, color, and lively effect.
 */
function GameKitchen({ onCollect }) {
  const { state } = useGame();
  const [ingredients, setIngredients] = useState([]);
  const tickRef = useRef();

  // Spawns new ingredients flying in with conveyor motion
  useEffect(() => {
    if (!state.isPlaying) return;
    tickRef.current = setInterval(() => {
      setIngredients(prev =>
        [
          ...prev,
          {
            id: Date.now() + Math.random(),
            type: INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)],
            x: -120,
            y: Math.floor(Math.random() * KITCHEN_ROWS) * 90 + 40,
            collected: false
          }
        ].filter(obj => !obj.collected)
      );
    }, state.isFrenzy ? 500 : 1200);

    return () => clearInterval(tickRef.current);
  }, [state.isPlaying, state.isFrenzy]);

  // Move ingredients to right ("flying")
  useEffect(() => {
    if (!state.isPlaying) return;
    const move = setInterval(() => {
      setIngredients(prev =>
        prev
          .map(obj => ({ ...obj, x: obj.x + (state.isFrenzy ? 15 : 7) }))
          .filter(obj => obj.x < 540) // drop if offscreen
      );
    }, 65);
    return () => clearInterval(move);
  }, [state.isPlaying, state.isFrenzy]);

  // Handle ingredient collect (click/drag)
  const handleCollect = idx => {
    if (typeof onCollect === "function") onCollect(ingredients[idx]);
    setIngredients(prev => prev.map((ing, i) =>
      i === idx ? { ...ing, collected: true } : ing
    ));
  };

  // Drag-and-drop & click-to-collect
  return (
    <div style={{
      position: "relative",
      width: 600,
      height: 350,
      background: COLORS.secondary,
      border: `4px solid ${COLORS.primary}`,
      borderRadius: 32,
      margin: "auto",
      overflow: "hidden",
      boxShadow: "0 0 64px 4px #fd818850"
    }}>
      {/* Conveyors */}
      {[...Array(KITCHEN_ROWS)].map((_, r) => (
        <div key={r} style={{
          position: "absolute",
          left: 0,
          top: r * 90 + 80,
          height: 15,
          width: "92%",
          background: `linear-gradient(90deg, ${COLORS.primary} 60%, #ffe45e 100%)`,
          borderRadius: 20,
          opacity: 0.22 + r * 0.08
        }}/>
      ))}
      {/* Ingredients flying in */}
      {ingredients.map((obj, idx) =>
        <IngredientItem
          key={obj.id}
          type={obj.type}
          x={obj.x}
          y={obj.y}
          onCollect={() => handleCollect(idx)}
          draggable={!obj.collected}
        />
      )}
      {/* Static kitchen UI/backdrop/props */}
      <img
        src="https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg"
        alt="Kitchen bg"
        style={{ position: "absolute", left: 0, top: 0, width: 160, height: 88, opacity: 0.21, pointerEvents: "none" }}
      />
      <span style={{
        position: "absolute",
        right: 18,
        top: 16,
        fontFamily: "Comic Sans MS, Comic Neue, cursive",
        fontWeight: 700,
        color: COLORS.accent,
        fontSize: 26,
        letterSpacing: 2,
        opacity: 0.1,
        zIndex: 1
      }}>FOOD TRUCK KITCHEN</span>
    </div>
  );
}
export default GameKitchen;
