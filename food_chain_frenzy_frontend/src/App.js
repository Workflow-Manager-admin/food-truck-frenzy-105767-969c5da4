import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { GameProvider, useGame } from "./context/GameContext";
import { UserProvider, useUser } from "./context/UserContext";
import GameKitchen from "./components/GameKitchen";
import HUDPanel from "./components/HUDPanel";
import CustomerQueue from "./components/CustomerQueue";
import OverlayEffects from "./components/OverlayEffects";
import BadgeBoard from "./components/BadgeBoard";
import Leaderboard from "./components/Leaderboard";
import RecipeCard from "./components/RecipeCard";
import AuthBar from "./components/AuthBar";
import { fetchLocalLeaderboard, addToLocalLeaderboard } from "./services/leaderboardService";
import { RECIPES, GAME_TIMER_SEC, FRENZY_MODE_DURATION_SEC } from "./constants/gameConstants";

// PUBLIC_INTERFACE
/**
 * Main App incorporating all providers.
 * Handles routing and all main game UI layout and context provision.
 */
function App() {
  // Theme toggling
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <UserProvider>
      <GameProvider>
        <MainGameUI theme={theme} toggleTheme={() => setTheme(t => (t === "light" ? "dark" : "light"))} />
      </GameProvider>
    </UserProvider>
  );
}

// PUBLIC_INTERFACE
/**
 * The root gameplay UI for Food Chain Frenzy.
 */
function MainGameUI({ theme, toggleTheme }) {
  const { state, dispatch } = useGame();
  const { state: userState, dispatch: userDispatch } = useUser();
  const [currRecipeIdx, setCurrRecipeIdx] = useState(0);
  const [localLeaderboard, setLocalLeaderboard] = useState([]);

  // Game Timer & Frenzy Timer management
  const frenzyTimer = useRef(null);
  useEffect(() => {
    if (state.isPlaying && !state.gameOver) {
      if (state.timeLeft > 0) {
        const timer = setTimeout(() => dispatch({ type: "TICK" }), 1000);
        return () => clearTimeout(timer);
      }
      dispatch({ type: "TRIGGER_GAME_OVER" });
    }
  }, [state.timeLeft, state.isPlaying, state.gameOver, dispatch]);

  // Handle end of Frenzy
  useEffect(() => {
    if (state.isFrenzy) {
      frenzyTimer.current = setTimeout(() => {
        dispatch({ type: "DEACTIVATE_FRENZY" });
      }, FRENZY_MODE_DURATION_SEC * 1000);
      return () => clearTimeout(frenzyTimer.current);
    }
  }, [state.isFrenzy, dispatch]);

  // Save to leaderboard at game over
  useEffect(() => {
    if (state.gameOver && state.score > 0 && state.isPlaying) {
      const name = userState.user?.displayName || "Anonymous";
      addToLocalLeaderboard({ name, score: state.score });
      setLocalLeaderboard(fetchLocalLeaderboard());
      userDispatch({ type: "LOAD_LEADERBOARD", leaderboard: fetchLocalLeaderboard() });
    }
  }, [state.gameOver, state.score, state.isPlaying, userState.user, userDispatch]);

  // Initialize leaderboards
  useEffect(() => {
    setLocalLeaderboard(fetchLocalLeaderboard());
  }, []);

  // Game logic for ingredient collection
  const [collected, setCollected] = useState([]);
  const [comboChain, setComboChain] = useState(0);

  // Collect ingredient into buffer; if matches next recipe, serve!
  function handleCollectIngredient(ingredient) {
    setCollected(prev => {
      const updated = [...prev, ingredient.type.name];
      if (JSON.stringify(updated) === JSON.stringify(RECIPES[currRecipeIdx].ingredients)) {
        // Successful serve
        setComboChain(c => c + 1);
        dispatch({ type: "SERVE", comboChain: comboChain + 1 });
        dispatch({ type: "ADD_BADGE", badge: "firstServe" });
        setTimeout(() => {
          setCollected([]);
          setCurrRecipeIdx(idx => (idx + 1) % RECIPES.length);
        }, 450);
      } else if (updated.length >= RECIPES[currRecipeIdx].ingredients.length) {
        // Wrong sequence = rage penalty
        dispatch({ type: "UPDATE_RAGE", amount: 25 });
        setCollected([]);
        setComboChain(0);
      }
      return updated;
    });
  }

  // Start/restart
  function handleStartGame() {
    dispatch({ type: "START_GAME" });
    setCollected([]);
    setComboChain(0);
    setCurrRecipeIdx(0);
  }

  // Tutorial controls
  function closeTutorial() {
    dispatch({ type: "HIDE_TUTORIAL" });
  }

  return (
    <div className="App" style={{ background: "#fffefa", minHeight: "100vh" }}>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <AuthBar />
      {state.showTutorial && (
        <RecipeCard
          recipe={RECIPES[currRecipeIdx]}
          onClose={closeTutorial}
          showTutorial
        />
      )}
      <OverlayEffects state={state} onRestart={handleStartGame} />
      <HUDPanel
        timeLeft={state.timeLeft}
        score={state.score}
        combo={state.combo}
        streak={state.streak}
        rage={state.rageMeter}
        isFrenzy={state.isFrenzy}
      />
      {!state.gameOver && (
        <>
          <GameKitchen
            onCollect={handleCollectIngredient}
          />
          <RecipeCard
            recipe={RECIPES[currRecipeIdx]}
            showTutorial={false}
          />
          <div style={{
            position: "absolute",
            left: 0, bottom: 28, width: "100vw", zIndex: 9
          }}>
            <CustomerQueue queueSize={5} currentMood={state.rageMeter > 75 ? "impatient" : "waiting"} />
          </div>
          <BadgeBoard unlocked={state.badges} />
          <Leaderboard leaderboard={localLeaderboard} highlightScore={state.score} />
        </>
      )}
      {(!state.isPlaying || state.gameOver) && (
        <div style={{
          position: "fixed",
          left: "50%", top: "57%", transform: "translate(-50%,-50%)",
          zIndex: 28,
          background: "#fffefaee",
          color: "#fd8188",
          border: "5px solid #fd8188",
          borderRadius: 32,
          padding: "36px 44px",
          textAlign: "center",
          boxShadow: "0 2px 48px #fd818844"
        }}>
          <div style={{
            fontSize: 36, fontWeight: 800,
            marginBottom: 12
          }}>
            {state.gameOver ? "Game Over!" : "Food Chain Frenzy"}
          </div>
          {state.gameOver && (
            <div style={{ fontSize: 21, fontWeight: 600, marginBottom: 12 }}>
              Final Score: {state.score}
            </div>
          )}
          <button onClick={handleStartGame}
            style={{
              fontSize: 20, fontWeight: 800,
              color: "#fffefa", background: "#fd8188",
              border: "none", borderRadius: 18,
              padding: "12px 40px",
              boxShadow: "0 0 8px #fd818885",
              marginBottom: 10,
              cursor: "pointer"
            }}>
            {state.gameOver ? "Play Again" : "Start Game"}
          </button>
          <div style={{
            fontSize: 13, fontWeight: 400, color: "#888", marginTop: 8
          }}>
            Collect, assemble, and serve flying ingredients in a wild food truck <br />
            Score combos, unlock badges, and rise on the local leaderboard!
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
