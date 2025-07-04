import React, { createContext, useReducer, useContext } from "react";
import {
  GAME_TIMER_SEC,
  FRENZY_MODE_DURATION_SEC,
  BASE_SCORE_PER_SERVE,
  COMBO_BONUS,
  STREAK_BONUS,
  RAGE_METER_MAX,
  CUSTOMER_MOODS
} from "../constants/gameConstants";

/**
 * Main game state context for Food Chain Frenzy.
 * Handles most gameplay state, scoring, combos, frenzy/rage, and badges.
 */

// Initial context shape
const initialState = {
  isPlaying: false,
  isFrenzy: false,
  timeLeft: GAME_TIMER_SEC,
  score: 0,
  combo: 0,
  streak: 0,
  served: 0,
  customers: [],
  rageMeter: 0,
  showTutorial: true,
  badges: [],
  achievements: [],
  gameOver: false
};

const GameContext = createContext(initialState);

// Game reducer acts on dispatched actions to mutate state
function gameReducer(state, action) {
  switch (action.type) {
    case "START_GAME":
      return {
        ...initialState,
        isPlaying: true,
        timeLeft: GAME_TIMER_SEC
      };
    case "TICK":
      return {
        ...state,
        timeLeft: state.timeLeft - 1 <= 0 ? 0 : state.timeLeft - 1,
        gameOver: state.timeLeft - 1 <= 0 || state.rageMeter >= RAGE_METER_MAX
      };
    case "SERVE":
      // calculate combo/streak, badge triggers etc.
      const isCombo = action.comboChain > 1;
      const isStreak = state.streak % 5 === 4;
      let newScore =
        state.score + BASE_SCORE_PER_SERVE +
        (isCombo ? COMBO_BONUS * action.comboChain : 0) +
        (isStreak ? STREAK_BONUS : 0);
      return {
        ...state,
        score: newScore,
        combo: isCombo ? state.combo + 1 : 0,
        streak: isCombo ? state.streak + 1 : 0,
        served: state.served + 1
        // badges could be handled here
      };
    case "ACTIVATE_FRENZY":
      return {
        ...state,
        isFrenzy: true
      };
    case "DEACTIVATE_FRENZY":
      return {
        ...state,
        isFrenzy: false
      };
    case "UPDATE_RAGE":
      // Cap rage
      const newRage = Math.min(state.rageMeter + action.amount, RAGE_METER_MAX);
      return {
        ...state,
        rageMeter: newRage,
        gameOver: newRage >= RAGE_METER_MAX
      };
    case "ADD_BADGE":
      return {
        ...state,
        badges: state.badges.includes(action.badge) ? state.badges : [...state.badges, action.badge]
      };
    case "TRIGGER_GAME_OVER":
      return {
        ...state,
        gameOver: true,
        isPlaying: false
      };
    case "SHOW_TUTORIAL":
      return { ...state, showTutorial: true };
    case "HIDE_TUTORIAL":
      return { ...state, showTutorial: false };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function GameProvider({ children }) {
  /** Context provider for global game state. */
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useGame() {
  /** Hook to consume context values. */
  return useContext(GameContext);
}
